import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export enum sortEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export class CreatePostDto {
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
