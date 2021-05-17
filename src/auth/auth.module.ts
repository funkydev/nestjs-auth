import { DynamicModule, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { IAuthConfig } from './auth.consts';
import { AuthModuleConfig } from './auth.types';
import { RefreshTokenMockRepository } from './repositories/refresh-token-mock.repository';
import { IRefreshTokenRepository } from './repositories/refresh-tokens.repository';
import { AuthAccessTokenStrategy } from './strategies/auth-access-token.strategy';
import { AuthPasswordStrategy } from './strategies/auth-password.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRefreshTokenStrategy } from './strategies/auth-refresh-token.strategy';

export class AuthModule {
  static register(config: AuthModuleConfig): DynamicModule {
    const AuthConfigProvider: Provider = {
      useValue: config,
      provide: IAuthConfig,
    };

    return {
      module: AuthModule,
      controllers: [AuthController],
      imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
          secret: config.jwtSecret,
          signOptions: { expiresIn: config.accessTokenExpiresIn },
        }),
      ],
      providers: [
        {
          provide: IRefreshTokenRepository,
          useClass: RefreshTokenMockRepository,
        },
        AuthService,
        AuthConfigProvider,
        AuthPasswordStrategy,
        AuthAccessTokenStrategy,
        AuthRefreshTokenStrategy,
      ],
      exports: [AuthService],
    };
  }
}
