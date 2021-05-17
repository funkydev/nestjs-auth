import { Controller, Post, Request } from '@nestjs/common';
import { PasswordAuth } from './auth.decorators';
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
}
