import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
 
export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: String,
    default: 'Vasya Pupkin',
    unique: false,
  })
  fullName: string;

  @Prop({
    type: String,
  })
  password: string;

  @Prop({
    type: String,
    unique:true,
  })
   email: String;
}

export const UserSchema = SchemaFactory.createForClass(User);
