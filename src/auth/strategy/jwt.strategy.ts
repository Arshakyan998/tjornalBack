import { NotFoundException } from '@nestjs/common/exceptions';
import { UserService } from './../../user/user.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstance } from '../constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly UserService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstance.secretKey,
    });
  }

  async validate(payload: { id: string }) {
    const user = this.UserService.findOne(payload.id);

    if (user) return user;

    return new NotFoundException('Этото юзер заблакирова или удален!').message;
  }
}
