import {ConflictException, Injectable} from '@nestjs/common';
import {UserRepository} from "./user.repository";
import {IUserCreateFields, UserRole} from "./interfaces";
import {UserEntity} from "./user.entity";
import {FindConditions} from "typeorm";
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
    constructor(
        public userRepo: UserRepository,
    ){}

    async findAll(){
        return await this.userRepo.find();
    }

    public findOne(where: FindConditions<UserEntity>): Promise<UserEntity | undefined> {
        return this.userRepo.findOne({where});
    }

    async findOneForAuth(email){
        return this.userRepo
            .createQueryBuilder('users')
            .addSelect('users.password')
            .where("users.email = :email", {email})
            .getOne();
    }

    async create(data: IUserCreateFields): Promise<UserEntity> {
        let user = await this.userRepo.findOne({email: data.email});

        if (user) {
            throw new ConflictException();
        }

        const password = await this.encryptPassword(data.password);

        user = await this.userRepo
            .create({
                ...data,
                roles: [UserRole.User],
                password: password,
            });

        await this.userRepo.save(user);
        delete user.password;
        return user;
    }

    async encryptPassword(password: string): Promise<string>{
        const salt = parseInt(process.env.BCRYPT_SALT)

        return new Promise((resolve, reject) => {
            bcrypt.hash(password, salt)
                .then(hash => {
                    resolve(hash);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    async decryptPassword(password, hash): Promise<boolean|string>{
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hash)
                .then(result => {
                    resolve(result);
                }).catch(err => {
                    reject(err);
                });
        });
    }

    // public createPasswordHash(password: string, salt: string): string {
    //     return createHash("sha256")
    //         .update(password)
    //         .update(salt)
    //         .digest("hex");
    // }
}
