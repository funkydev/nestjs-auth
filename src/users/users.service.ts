import { User } from './models/user';

export const IUserService = Symbol('user-service');

export interface UsersService {
  findByEmail(email: string): Promise<User>;
}
