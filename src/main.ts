import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { env } from 'process';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
// import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    session({
      secret: `${process.env.JWT_SECRET}`,
      resave: false,
      saveUninitialized: false,
    }),
  );
  console.log(`${process.env.JWT_SECRET}`)
  // var cors = require('cors')
  // app.use(cors())
  app.use(passport.initialize());
  app.use(passport.session());
  // app.setGlobalPrefix('api')

  app.enableCors({
    credentials: true,
    allowedHeaders: 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization, Observe',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: true,
    // origin: [
    // 'https://landmotors-client.onrender.com',
    //   // 'https://landmotors-server.onrender.com',
    //   // 'http://localhost:3001',
    // ],
  });
  // app.enableCors()

  await app.listen(process.env.PORT || 3001, function () {console.log('CORS-enabled web server listening on port 3001')});
}
bootstrap();
