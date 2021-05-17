import { NotFoundException } from '@nestjs/common';
import { RefreshToken } from '../models/refresh-token';
import { RefreshTokensRepository } from './refresh-tokens.repository';

type RefreshTokenRow = {
  userId: string;
  token: string;
  expiryAt: number;
  issuedAt: number;
};

export class RefreshTokenMockRepository implements RefreshTokensRepository {
  constructor(private rows: RefreshTokenRow[] = []) {}

  create(refreshToken: RefreshToken): Promise<void> {
    this.rows.push({
      userId: refreshToken.userId,
      token: refreshToken.token,
      expiryAt: refreshToken.expiryAt,
      issuedAt: refreshToken.issuedAt,
    });

    return Promise.resolve();
  }

  get(token: string): Promise<RefreshToken> {
    const row = this.rows.find((_) => _.token === token);

    if (!row) {
      throw new NotFoundException('Token does not exist');
    }

    return Promise.resolve(
      new RefreshToken(row.userId, row.token, row.expiryAt, row.issuedAt),
    );
  }

  remove(token: string): Promise<void> {
    this.rows = this.rows.filter((_) => _.token !== token);

    return Promise.resolve();
  }
}
