import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule.register({
      jwtSecret: process.env.JWT_SECRET || 'secret',
      accessTokenExpiresIn: 2 * 60 * 1000, // 2 minutes
      refreshTokenExpiresIn: 60 * 60 * 1000, // 1 hour
    }),
    UsersModule,
  ],
})
export class AppModule {}
