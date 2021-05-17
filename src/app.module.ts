import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    AuthModule.register({
      jwtSecret: process.env.JWT_SECRET || 'secret',
      accessTokenExpiresIn: 2 * 60 * 1000, // 2 minutes
      refreshTokenExpiresIn: 60 * 60 * 1000, // 1 hour
    }),
  ],
})
export class AppModule {}
