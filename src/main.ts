import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  var cookieParser = require('cookie-parser')
  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.setGlobalPrefix('api')
  // app.use(passport.session());

  app.enableCors({
    credentials: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Observe',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: true
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
