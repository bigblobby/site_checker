import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {LocalStrategy} from "./strategies/local";
import {SessionSerializer} from "./session.serializer";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer]
})
export class AuthModule {}
