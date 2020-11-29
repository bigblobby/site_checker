import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {UserRole} from "./interfaces";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: "varchar"})
    public email: string;

    @Column({type: "varchar", select: false})
    public password: string;

    @Column({type: "varchar", select: false, nullable: true})
    public biometricPublicKey?: string;

    @Column({
        type: "enum",
        enum: UserRole,
        array: true
    })
    public roles: UserRole[];

    @Column({ default: false })
    confirmed: boolean;
}
