import { PostDocument, PostModel } from '../models/post.model';
import { CategoryDocument, CategoryModel } from '../models/category.model';

export class PostRepository {
  public async getPosts(skip: number, limit: number): Promise<{ posts: PostDocument[]; count: number }> {
    const count = await PostModel.countDocuments();
    const posts = await PostModel.find()
      .skip(skip)
      .limit(limit)
      .populate('category', '_id title')
      .sort({ createdAt: -1 })
      .exec();
    return { posts, count };
  }

  public async getPost(slug: string): Promise<PostDocument | null> {
    const post = await PostModel.findOne({ slug: slug }).populate('category').exec();
    return post;
  }

  public async addPost(title: string, body: string, category_id?: string, tags?: [string]): Promise<PostDocument> {
    let category: CategoryDocument | null = null;

    if (category_id !== undefined || null) category = await CategoryModel.findById(category_id);

    const post = new PostModel({
      title: title,
      body: body,
      category: category?._id,
      tags: tags,
    });
    const document = await post.save();

    // Push post id to category's posts[] if category exist
    if (category) {
      const update = { $push: { posts: post.id } };
      const options = { new: true, upsert: true };
      await CategoryModel.findByIdAndUpdate(category_id, update, options).exec();
      console.log(`[CATEGORYs] ${category.title} has this post now`);
    }

    return document;
  }

  public async updateCategory(slug: string, category_id: string): Promise<PostDocument | null> {
    let post: PostDocument | null = null;
    const category = await CategoryModel.findById(category_id).exec();

    // If this category is exist
    if (category) {
      const update = { category: category_id };
      post = await PostModel.findOneAndUpdate({ slug: slug }, update, { new: false });

      if (post) {
        // Remove this post from old category's post[]
        if (post.category !== null || undefined) {
          const old_category = await CategoryModel.findByIdAndUpdate(post.category, {
            $pull: { posts: post._id },
          }).exec();
          console.log(`[CATEGORYs] ${old_category?.title} has been delete this post`);
        }

        // Add post to category's posts[]
        const push_update = { $push: { posts: post._id } };
        await CategoryModel.findByIdAndUpdate(category, push_update).exec();
        console.log(`[CATEGORYs] ${category.title} has this post now`);
      }
    }

    return post;
  }

  public async deletePost(slug: string): Promise<PostDocument | null> {
    const post = await PostModel.findOneAndDelete({ slug: slug });

    // Remove post from category's posts[]
    if (post) {
      const filter = post.category;
      const update = { $pull: { posts: post._id } };
      const category = await CategoryModel.findByIdAndUpdate(filter, update).exec();
      console.log(`[CATEGORYs] ${category?.title} has been delete this post`);
    }

    return post;
  }
}
