import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const AuthPassword = () =>
  applyDecorators(UseGuards(AuthGuard('local')));

export const AuthAccessToken = () =>
  applyDecorators(UseGuards(AuthGuard('jwt')));

export const AuthRefreshToken = () =>
  applyDecorators(UseGuards(AuthGuard('token')));
