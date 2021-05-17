import { Controller, Post, Request, Get } from '@nestjs/common';
import { AccessTokenAuth, PasswordAuth } from './auth.decorators';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @PasswordAuth()
  async login(@Request() req) {
    const accessToken = this.authService.generateAccessToken(req.user);
    const refreshToken = this.authService.generateRefreshToken(req.user);

    return { accessToken, refreshToken };
  }

  @Get('/current')
  @AccessTokenAuth()
  async getUserDetails(@Request() req) {
    return req.user;
  }
}
