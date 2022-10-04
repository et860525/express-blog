import { model, Schema, Types } from 'mongoose';
import { CoreDocument } from '../types/model.type';
import slugify from 'slugify';

export interface PostDocument extends CoreDocument {
  title: string;
  body: string;
  category: Types.ObjectId | string;
  tags: Types.Array<Types.ObjectId> | Types.Array<string>;
  slug: string;
}

const PostSchema = new Schema<PostDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const PostModel = model('Post', PostSchema);
