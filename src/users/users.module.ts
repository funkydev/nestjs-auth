import { Module } from '@nestjs/common';
import { UsersMockData } from './services/users-mock.data';
import { UsersController } from './users.controller';
import { IUserService } from './users.service';
import { UsersMockService } from './services/users-mock.service';

@Module({
  controllers: [UsersController],
  providers: [
    { provide: IUserService, useValue: new UsersMockService(UsersMockData) },
  ],
  exports: [IUserService],
})
export class UsersModule {}
