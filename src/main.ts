import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  // app.use(function(_req, res, next) {
  //   res.header("Access-Control-Allow-Origin", "https://landmotors-client.onrender.com"); // Update to match the domain you will make the request from
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   next();
  // });
  // app.setGlobalPrefix('api')

  app.enableCors({
    credentials: true,
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Observe, Access-Control-Allow-Origin, Access-Control-Allow-Headers',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: [
      // 'https://landmotors-client.onrender.com',
      'https://landmotors-server.onrender.com',
      // 'http://localhost:3001',
    ],
  });
  // app.enableCors()

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
