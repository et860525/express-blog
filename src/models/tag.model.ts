import { model, Schema, Types } from 'mongoose';

export interface TagDocument {
  title: string;
  posts: Types.Array<Types.ObjectId>;
}

const TagSchema = new Schema<TagDocument>({
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

export const TagModel = model('Tag', TagSchema);
