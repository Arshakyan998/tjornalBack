import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user) {
    // Проверяем ошибку авторизации
    if (err || !user) {
      // Создаем исключение UnauthorizedException с вашим собственным сообщением об ошибке
      throw new UnauthorizedException('Пользователь не найден или не зарегестрирован');
    }
    // Если пользователь успешно авторизован, возвращаем пользователя
    return user;
  }
}
