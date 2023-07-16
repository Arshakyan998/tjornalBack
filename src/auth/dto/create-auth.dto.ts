import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateAuthDto {
   @ApiProperty({
    name: 'email',
    default: 'pupkin@mail.ru',
    required: true,
  })
  @IsEmail(undefined,{
        message:"Not valid mail"
  })

  email: string;

  @ApiProperty({
    name: 'password',
    default: '1234',
    required: true,
  })
  password: string;
}
