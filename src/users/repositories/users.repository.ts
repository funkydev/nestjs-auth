import { User } from '../models/user';

export const IUsersRepository = Symbol('users-repository');

export interface UsersRepository {
  findByEmail(email: string): Promise<User>;

  findById(id: string): Promise<User>;
}
