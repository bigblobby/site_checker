import {Body, Controller, Get, HttpCode, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Public, User} from "../common/decorators";
import {LoginGuard} from "../common/guards";
import {UserEntity} from "../user/user.entity";
import {UserCreateDto} from "../user/dtos";
import {UserService} from "../user/user.service";
import {Request, Response} from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @UseGuards(LoginGuard)
    @Post('login')
    login(@User() user: UserEntity, @Req() req: Request){
        return user;
    }

    @Public()
    @HttpCode(204)
    @Get("/logout")
    public logout(@Req() req: Request, @Res() res: Response): void {
        // @ts-ignore
        req.session.destroy();
        req.logout();
        res.clearCookie("nest");
        res.send("");
    }

    @Public()
    @Post('register')
    async signUp(@Body() data: UserCreateDto, @Req() req: Request){
        const user = await this.userService.create(data);
        return user;
    }
}
