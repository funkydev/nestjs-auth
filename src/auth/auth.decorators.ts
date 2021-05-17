import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const PasswordAuth = () =>
  applyDecorators(UseGuards(AuthGuard('local')));

export const AccessTokenAuth = () =>
  applyDecorators(UseGuards(AuthGuard('jwt')));
