import { RefreshToken } from '../models/refresh-token';

export const IRefreshTokenRepository = Symbol('refresh-token-repository');

export interface RefreshTokensRepository {
  create(refreshToken: RefreshToken): Promise<void>;

  get(token: string): Promise<RefreshToken>;

  remove(token: string): Promise<void>;
}
