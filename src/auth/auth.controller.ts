import { Controller, Get, Post, Request } from '@nestjs/common';
import { AuthPassword, AuthRefreshToken } from './auth.decorators';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @AuthPassword()
  async login(@Request() req) {
    const [accessToken, refreshToken] = await Promise.all([
      this.authService.generateAccessToken(req.user),
      this.authService.generateRefreshToken(req.user),
    ]);

    return { accessToken, refreshToken };
  }

  @Get('/login/refresh')
  @AuthRefreshToken()
  async loginWithRefreshToken(@Request() req) {
    return this.login(req);
  }
}
