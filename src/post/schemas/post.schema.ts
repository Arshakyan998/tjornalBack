import {
  User,
  UserDocument,
  UserSchema,
} from './../../user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({
    type: { id: { type: Types.ObjectId, ref: 'User' } },
    required: true,
    _id: false,
  })
  author: {
    id: Types.ObjectId;
  };

  @Prop({
    type: String,
    required: true,
  })
  title: string;
  @Prop({
    type: [String],
    required: false,
  })
  tags?: string[];

  @Prop({
    type: [JSON],
    required: true,
  })
  body: any[];

  @Prop({
    type: Number,
    default: 0,
  })
  views: 0;
}

export const PostSchema = SchemaFactory.createForClass(Post);
