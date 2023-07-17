import { Injectable, UseGuards } from '@nestjs/common';
import { CreatePostDto, sortEnum } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './schemas/post.schema';
import mongoose from 'mongoose';
import {
  NotFoundException,
  BadRequestException,
} from '@nestjs/common/exceptions';
import { SearchPostDto } from './dto/search-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly PostModel: mongoose.Model<Post>,
  ) {}
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createPost = await this.PostModel.create(createPostDto);

    return createPost.save();
  }

  async findAll() {
    return this.PostModel.find().sort({
      createdAt: 'desc',
    });
  }

  async sortByType(sortValue: sortEnum) {
    const getPopularposts = this.PostModel.find()
      .limit(5)
      .sort({
        views: sortValue,
      })
      .lean();

    const getSortedData = this.PostModel.countDocuments(
      getPopularposts.getQuery(),
    ).exec();

    const [posts, count] = await Promise.all([getPopularposts, getSortedData]);

    return {
      posts,
      count,
    };
  }

  async search(dto: SearchPostDto) {
    const getData = this.PostModel.find();
    if (dto.title) {
      getData.where('title').equals({ $regex: new RegExp(dto.title, 'i') });
    }
    if (dto.body) {
      getData.where('body').equals({ $regex: new RegExp(dto.body, 'i') });
    }

    if (dto.tags) {
      getData.where('tags').equals({
        $in: Array.from(dto.tags),
      });
    }

    const getAllCount = this.PostModel.countDocuments(getData.getQuery());

    const [post, count] = await Promise.all([getData, getAllCount]);

    return {
      post,
      count,
    };
  }

  async findOne(id: mongoose.ObjectId): Promise<Post> {
    if (!mongoose.isObjectIdOrHexString(id)) {
      throw new BadRequestException('Некорректный ID для MongoDB');
    }

    const findPost = await this.PostModel.findByIdAndUpdate(id, {
      $inc: {
        views: 1,
      },
    })
      .populate('author', '_id')
      .lean();

    if (!findPost) {
      throw new NotFoundException('Пост не найден');
    }

    return findPost;
  }

  async update(
    id: mongoose.ObjectId,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const updatePost = await this.PostModel.findByIdAndUpdate(
      id,
      updatePostDto,
    );

    return { ...updatePost.save(), ...updatePostDto };
  }

  async remove(id: mongoose.ObjectId) {
    try {
      await this.PostModel.findByIdAndRemove(id);

      return JSON.stringify({
        succsess: true,
      });
    } catch (error) {
      throw new BadRequestException({
        succsess: false,
        messgae: (error as Error).message,
      });
    }
  }
}
