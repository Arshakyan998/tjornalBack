import { ApiProperty } from '@nestjs/swagger';

export class SearchUserDto {
  @ApiProperty({
    name: 'email',
    default: 'pupkin@email.com',
    required: false,
  })
  email?: string;
  @ApiProperty({
    name: 'fullName',
    default: 'Vasya',
    required: false,
  })
  fullName?: string;
}
