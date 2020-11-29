require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import session from "express-session";
import connectRedis from "connect-redis";
import * as redis from "redis";
import passport from "passport";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  app.use(
      session({
        cookie: {
          path: "/",
          httpOnly: true,
          secure: false,
          maxAge: 24 * 60 * 60 * 1000,
          signed: false,
        },
        name: "nest",
        resave: false,
        secret: process.env.SESSION_SECRET,
        store: new (connectRedis(session))({client: redis.createClient(process.env.REDIS_URL)}),
        saveUninitialized: true,
      }),
  );

    app.use(passport.initialize());
    app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
