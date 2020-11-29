import {CacheModule, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {UserRepository} from "./user.repository";
import {TypeOrmModule} from "@nestjs/typeorm";
import redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
      CacheModule.register({
        store: redisStore,
        host: 'localhost',
        port: process.env.REDIS_PORT,
      }),
      TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
