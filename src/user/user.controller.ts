import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SearchUserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiBody({
    type: SearchUserDto,
    description: 'Поиск пользователей',
    required: false,
  })
  @Post('/search')
  search(@Body() data) {
    console.log('wdw', data);

    return this.userService.findSearchedUser(data);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiHeader({ name: 'Authorization', description: 'Bearer {token}' })
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
