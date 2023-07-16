import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { User } from './user/schemas/user.schema';
import { CheckActiveMaile } from './user/user.middleware';
import { PostModule } from './post/post.module';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
 const URL =
  'mongodb+srv://agentnomberone:nestTest123@cluster0.ycybtbi.mongodb.net';

@Module({
  imports: [MongooseModule.forRoot(URL), UserModule, PostModule, AuthModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CheckActiveMaile).forRoutes({
      path: User.name,
      method: RequestMethod.POST,
    });
  }
}
