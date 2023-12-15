import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthenticatedGuard } from './auth/authentificated.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new AuthenticatedGuard());
  app.use(
    session({
      secret: 'keyword',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.enableCors({
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    origin: [
      'https://landmotors-client.onrender.com'
      // 'https://landmotors-server.onrender.com',
      // 'http://localhost:3000',
      // 'http://localhost:3001',
    ],
  });

  const config = new DocumentBuilder()
    .setTitle('Автосервис')
    .setDescription('api documentation')
    .setVersion('1.0')
    .addTag('сервис')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
