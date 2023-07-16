import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentsDocument = HydratedDocument<Comments>;

@Schema({
  timestamps: true,
})
export class Comments {
  @Prop({
    type: String,
    required: true,
  })
  comment: string;

  @Prop({
    ref: 'User',
    required: true,
  })
  author: string;
  @Prop({
    ref: 'Post',
    required: true,
  })
  postId: string;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);
