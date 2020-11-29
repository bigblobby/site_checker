import {Module, ValidationPipe} from '@nestjs/common';
import { SiteCheckerModule } from './site-checker/site-checker.module';
import {APP_GUARD, APP_PIPE} from "@nestjs/core";
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "./config/typeOrmConfig";
import { UserModule } from './user/user.module';
import {AppController} from "./app.controller";
import { AuthModule } from './auth/auth.module';
import {CustomValidationPipe} from "./common/pipes";
import {LocalGuard} from "./common/guards";

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        SiteCheckerModule,
        UserModule,
        AuthModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_PIPE,
            useClass: CustomValidationPipe,
        },
        {
            provide: APP_GUARD,
            useClass: LocalGuard,
        },
    ],
})
export class AppModule {}
