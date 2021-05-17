import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy } from 'passport-unique-token';
import {
  IUsersRepository,
  UsersRepository,
} from '../../users/repositories/users.repository';
import {
  IRefreshTokenRepository,
  RefreshTokensRepository,
} from '../repositories/refresh-tokens.repository';

@Injectable()
export class AuthRefreshTokenStrategy extends PassportStrategy(
  UniqueTokenStrategy,
) {
  constructor(
    @Inject(IRefreshTokenRepository)
    private readonly refreshTokenRepository: RefreshTokensRepository,
    @Inject(IUsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    super({ tokenHeader: 'X-Refresh-Token', failOnMissing: false });
  }

  async validate(token: string): Promise<any> {
    try {
      const refreshToken = await this.refreshTokenRepository.get(token);

      await this.refreshTokenRepository.remove(token);

      if (!refreshToken.isValid()) {
        throw new UnauthorizedException('Refresh token has been expired');
      }

      return await this.usersRepository.findById(refreshToken.userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }
}
