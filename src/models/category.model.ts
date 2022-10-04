import { model, Schema, Types } from 'mongoose';
import { CoreDocument } from '../types/model.type';

export interface CategoryDocument extends CoreDocument {
  title: string;
  posts: Types.Array<Types.ObjectId>;
}

const CategorySchema = new Schema<CategoryDocument>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

export const CategoryModel = model<CategoryDocument>('Category', CategorySchema);
