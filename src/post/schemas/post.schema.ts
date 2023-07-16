import { UserDocument, UserSchema } from './../../user/schemas/user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type PostDocument = HydratedDocument<Post>;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  })
  author: User;
  
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
    type: String,
    required: true,
  })
  body: string;

  @Prop({
    type: Number,
    default: 0,
  })
  views: 0;
}

export const PostSchema = SchemaFactory.createForClass(Post);
