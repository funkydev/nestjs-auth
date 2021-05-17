import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  IUsersRepository,
  UsersRepository,
} from '../../users/repositories/users.repository';

@Injectable()
export class AuthPasswordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(IUsersRepository)
    private usersRepository: UsersRepository,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user.validatePassword(password)) {
        throw new UnauthorizedException();
      }

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnauthorizedException();
      }

      throw error;
    }
  }
}
