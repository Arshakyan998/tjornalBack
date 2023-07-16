import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'Vasya Pupkin',
    description: 'User full name',
    required: true,
  })
  fullName: string;

  @ApiProperty({
    default: 'pupkin@mail.ru',
    description: 'youre email',
    type: String,
    required: true,
  })
  @IsEmail(undefined, {
    message: 'Не верная почта',
  })
  email: string;

  @ApiProperty({
    default: '1234',
    description: 'Password',
    type: String,
    required: true,
  })
  password: string;
}
