import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Header,
} from '@nestjs/common';

import { ValidationPipe } from '@nestjs/common/pipes';

import { PostService } from './post.service';
import { CreatePostDto, sortEnum } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { SearchPostDto } from './dto/search-post.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @ApiQuery({
    required: true,
    name: 'sort',
    enum: sortEnum,
  })
  @Get('/popular')
  sortByType(@Query('sort') sort: sortEnum) {
    return this.postService.sortByType(sort);
  }
 
 
  @Get('/search')
  search(@Query() dto: SearchPostDto) {
    return this.postService.search(dto);
  }

  // @ApiQuery({
  //   required: false,
  //   description: 'query params',
  // })
  // @ApiHeader({
  //   name: 'token',
  //   required: true,
  // })
  // @ApiHeader({
  //   name: 'xz',
  //   required: true,
  // })
  @ApiParam({
    name: 'id',
  })
  @Header('azazazz-x', 'x-station')
  @Get(':id')
  findOne(
    @Param('id') id: mongoose.ObjectId,
    // @Query('data') xx?: string,
    // @Req() request?: Request,
  ) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: mongoose.ObjectId,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: mongoose.ObjectId) {
    return this.postService.remove(id);
  }
}
