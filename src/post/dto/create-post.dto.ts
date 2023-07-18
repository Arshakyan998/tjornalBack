import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import Mongoose from 'mongoose';

export enum sortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class CreatePostDto {
  // @ApiProperty({
  //   default: '649c87ba1670d438c40b521d',
  //   type: {
  //     id: Mongoose.Types.ObjectId,
  //   },
  // })
  @IsOptional()
  author: {
    id: any;
  };
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
  @IsOptional()
  @IsArray({
    message: 'tags must by arr',
  })
  tags?: string[];
  views: number;
}
