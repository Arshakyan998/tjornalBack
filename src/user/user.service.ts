import { Injectable, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { SearchUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: mongoose.Model<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    try {
      const creatUser = await this.UserModel.create({
        ...createUserDto,
        password: hash,
      });

      return creatUser.save();
    } catch (error) {
      throw new ForbiddenException('Пользователь с таким майлом уже сущестует выбирите другой').getResponse();
    }
  }

  async findByData(data: Partial<User>) {
    return this.UserModel.findOne(data);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findSearchedUser(data: SearchUserDto) {
    const allUsers = this.UserModel.find().select('-password');

    if (data.email) {
      allUsers.where('email').equals({
        $regex: new RegExp(data.email, 'i'),
      });
    }

    if (data.fullName) {
      allUsers.where('fullName').equals({
        $regex: new RegExp(data.fullName, 'i'),
      });
    }

    const getFindedUserCount = this.UserModel.countDocuments(
      allUsers.getQuery(),
    );

    const [findedUser, findedUserCounts] = await Promise.all([
      allUsers,
      getFindedUserCount,
    ]);

    return {
      users: findedUser.length === 1 ? findedUser[0] : findedUser,
      count: findedUserCounts,
    };
  }

  async findOne(id: string) {
    const getUser = await this.UserModel.findById(id);

    const { password, ...data } = getUser.toJSON();

    return data;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const findUserAndUpdate = await this.UserModel.findByIdAndUpdate(
      id,
      updateUserDto,
    );
    return { ...findUserAndUpdate.toObject(), ...updateUserDto };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
