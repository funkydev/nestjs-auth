import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  IUsersRepository,
  UsersRepository,
} from '../../users/repositories/users.repository';
import { IAuthConfig } from '../auth.consts';
import { AuthModuleConfig } from '../auth.types';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthConfig)
    private readonly authConfig: AuthModuleConfig,
    @Inject(IUsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret || '60s',
    });
  }

  async validate(payload: any) {
    try {
      const userId = payload.sub;

      return await this.usersRepository.findById(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }
}
