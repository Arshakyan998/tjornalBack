import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  HttpStatus,
  Get,
  Header,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
@ApiTags('Your Controller')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post()
  async findOneUser(@Body() data: CreateAuthDto) {
     const validateUser = await this.AuthService.validateUser(data);

    if (!validateUser) {
      throw new NotFoundException(
        'пароль или логин введены не правилно',
      ).getResponse();
    }

    return validateUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'Endpoint description' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @ApiBody({ type: CreateAuthDto })
  async login(@Request() req) {
    return this.AuthService.login(req.user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('/registration')
  @ApiBody({
    type: CreateUserDto,
  })
  registration(@Body() data: CreateUserDto) {
    return this.AuthService.registartion(data);
  }
}
