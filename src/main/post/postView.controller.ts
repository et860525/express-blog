import { Request, Response } from 'express';
import { marked } from 'marked';
import { PostRepository } from '../../repositories/post.repository';

export class PostViewController {
  // Only call the function is can't use postRepo, need to use class call!

  private readonly postRepo = new PostRepository();

  public async getPosts(req: Request) {
    const posts = await this.postRepo.getPosts(0, 10);
    return { view: 'index', data: posts };
  }
  public async getPost(req: Request) {
    const slug = req.params.title;
    const post = await this.postRepo.getPost(slug);

    if (!post) {
      return { view: 'post', data: { post: post } };
    }

    const title = post.title;
    const body = marked(post.body);

    return { view: 'post', data: { post: { title: title, body: body } } };
  }
  public async addPost_get() {
    return { view: 'post_form' };
  }
  public async addPost_post(req: Request, res: Response) {
    const { title, body } = req.body;
    const post = await this.postRepo.addPost(title, body);
    res.redirect('/');
  }
}
