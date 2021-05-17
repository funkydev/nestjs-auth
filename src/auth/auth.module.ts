import { DynamicModule, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { IAuthConfig } from './auth.consts';
import { AuthModuleConfig } from './auth.types';
import { RefreshTokenMockRepository } from './repositories/refresh-token-mock.repository';
import { IRefreshTokenRepository } from './repositories/refresh-tokens.repository';
import { JwtStrategy } from './strategies/auth-jwt.strategy';
import { LocalStrategy } from './strategies/auth-local.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRefreshStrategy } from './strategies/auth-refresh.strategy';

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
        AuthConfigProvider,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        AuthRefreshStrategy,
      ],
      exports: [AuthService],
    };
  }
}
