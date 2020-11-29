import {
    CacheInterceptor,
    Controller,
    Get,
    UseInterceptors
} from '@nestjs/common';
import {UserService} from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        public userService: UserService
    ) {}

    @Get('all')
    @UseInterceptors(CacheInterceptor)
    async findAll(){
        return this.userService.findAll();
    }
}
