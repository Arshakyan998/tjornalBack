import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';

import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UserService,

    private readonly jwtService: JwtService,
  ) {}
  async validateUser(data: CreateAuthDto) {
    const user = await this.UserService.findByData({ email: data.email });
    let isMatch;
    if (user) {
      isMatch = await bcrypt.compare(data.password, user.password);
    }
    if (user && isMatch) {
      const { password, ...result } = user.toObject();
      return {
        ...result,
        token: this.createJwtData(result._id as unknown as string),
      };
    }

    return null;
  }

  createJwtData(data: string) {
    return this.jwtService.sign({ id: data });
  }

  async login(user) {
    const { password, ...data } = user;

    return {
      token: this.createJwtData(user._id),
      ...data,
    };
  }

  async registartion(data: CreateUserDto) {
    const createdUser = await this.UserService.create(data);

    const { password, ...user } = createdUser.toObject();
    return {
      ...user,
      token: this.createJwtData(user._id),
    };
  }
}
