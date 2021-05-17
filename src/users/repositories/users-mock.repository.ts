import { NotFoundException } from '@nestjs/common';
import { UsersMockRow } from './users-mock.data';
import { UsersRepository } from './users.repository';
import { User } from '../models/user';

export class UsersMockRepository implements UsersRepository {
  constructor(private readonly users: UsersMockRow[] = []) {}

  async findByEmail(email: string): Promise<User> {
    const userRow = this.users.find((user) => user.email === email);

    if (!userRow) {
      throw new NotFoundException('User does not exist');
    }

    return new User(userRow.id, userRow.email, userRow.passwordHash);
  }

  async findById(id: string): Promise<User> {
    const userRow = this.users.find((user) => user.id === id);

    if (!userRow) {
      throw new NotFoundException('User does not exist');
    }

    return new User(userRow.id, userRow.email, userRow.passwordHash);
  }
}
