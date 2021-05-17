import { Module } from '@nestjs/common';
import { UsersMockData } from './repositories/users-mock.data';
import { UsersController } from './users.controller';
import { IUsersRepository } from './repositories/users.repository';
import { UsersMockRepository } from './repositories/users-mock.repository';

@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: IUsersRepository,
      useValue: new UsersMockRepository(UsersMockData),
    },
  ],
  exports: [IUsersRepository],
})
export class UsersModule {}
