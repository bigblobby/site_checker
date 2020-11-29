import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 32769,
    username: 'postgres',
    password: 'password',
    database: 'test',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
    subscribers: [__dirname + '/../subscribers/*.subscriber{.ts,.js}'],
};
