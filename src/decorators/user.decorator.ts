import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const reqest = ctx.switchToHttp().getRequest();
    return reqest.user;
  },
);
