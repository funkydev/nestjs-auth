import { Controller, Get, Request } from '@nestjs/common';
import { AccessTokenAuth } from '../auth/auth.decorators';

@Controller('/users')
export class UsersController {
  @Get('/current')
  @AccessTokenAuth()
  async getCurrentUser(@Request() req) {
    return req.user;
  }
}
