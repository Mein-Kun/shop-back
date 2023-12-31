import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: "erg34KD:SK*D.D))xfgh",
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.setGlobalPrefix('api')

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
