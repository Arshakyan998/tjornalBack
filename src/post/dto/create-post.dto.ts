import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import Mongoose from 'mongoose';

export enum sortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class CreatePostDto {
  @ApiProperty({
    default: '649c87ba1670d438c40b521d',
    type: Mongoose.Types.ObjectId,
  })
  author: string;
  @ApiProperty({
    type: String,
  })
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
  })
  body: string;

  @ApiProperty({
    type: [String],
    default: [],
  })
  @IsArray({
    message: 'notArray',
  })
  tags?: string[];
  views: number;
}
