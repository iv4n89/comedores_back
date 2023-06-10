import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    session({
      secret: process.env.SECRET || 'O~7o9v-S>lsBT;.%uQIvRm^&i%Htj',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 3600000 },
    })
  );
  // app.use(passport.initialize());
  // app.use(passport.session());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
