import {IsEmail, IsString, MinLength} from "class-validator";

import {IUserCreateFields} from "../interfaces";


export class UserCreateDto implements IUserCreateFields {
    @IsEmail()
    public email: string;

    @IsString()
    @MinLength(6)
    public password: string;
}
