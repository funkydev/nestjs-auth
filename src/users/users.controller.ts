import { Controller, Get, Request } from '@nestjs/common';
import { AuthAccessToken } from '../auth/auth.decorators';

@Controller('/users')
export class UsersController {
  @Get('/current')
  @AuthAccessToken()
  async getCurrentUser(@Request() req) {
    return req.user;
  }
}
