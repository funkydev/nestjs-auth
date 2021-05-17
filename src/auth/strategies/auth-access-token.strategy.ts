import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserService, UsersService } from '../../users/users.service';
import { IAuthConfig } from '../auth.consts';
import { AuthModuleConfig } from '../auth.types';

@Injectable()
export class AuthAccessTokenStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IAuthConfig)
    private readonly authConfig: AuthModuleConfig,
    @Inject(IUserService)
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.jwtSecret || '60s',
    });
  }

  async validate(payload: any) {
    try {
      const email = payload.username;

      return await this.usersService.findByEmail(email);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }
}
