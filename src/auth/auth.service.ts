import { randomBytes } from 'crypto';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user';
import { IAuthConfig } from './auth.consts';
import { AuthModuleConfig } from './auth.types';
import { RefreshToken } from './models/refresh-token';
import {
  IRefreshTokenRepository,
  RefreshTokensRepository,
} from './repositories/refresh-tokens.repository';

type TokenResult = { expiryAt: number; value: string };

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthConfig)
    private readonly authConfig: AuthModuleConfig,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(IRefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokensRepository,
  ) {}

  generateAccessToken(user: User): TokenResult {
    const payload = { username: user.email, sub: user.email };
    const token = this.jwtService.sign(payload);
    const decoded = this.jwtService.decode(token);
    const expiryAt = new Date(+decoded['exp'] * 1000);

    return { expiryAt: expiryAt.getTime(), value: token };
  }

  async generateRefreshToken(user: User): Promise<TokenResult> {
    const token = randomBytes(256 / 8).toString('base64');
    const currentTime = Math.floor(Date.now() / 1000) * 1000; // without ms
    const expiryAt =
      this.authConfig.refreshTokenExpiresIn &&
      this.authConfig.refreshTokenExpiresIn !== Infinity
        ? new Date(currentTime + +this.authConfig.refreshTokenExpiresIn)
        : new Date(Infinity);

    await this.refreshTokenRepository.create(
      new RefreshToken(user.id, token, Date.now(), expiryAt.getTime()),
    );

    return { expiryAt: expiryAt.getTime(), value: token };
  }
}
