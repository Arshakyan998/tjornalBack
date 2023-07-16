import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { User } from './schemas/user.schema';
import mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class CheckActiveMaile implements NestMiddleware {
  

  async use(req: Request, res: Response, next: NextFunction) {
    const body = req.body as CreateUserDto;

//     return res.status(200).send('JSON.stringify(userModule)');
     next();
  }
}
