import { beforeEach, afterEach } from 'node:test';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { Users } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthModule } from 'src/auth/auth.module';

const mokedUser = {
  username: 'Jhon',
  email: 'jhon.357@gmail.com',
  password: 'Jhon357',
};

describe('Auth service', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        AuthModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    app.use(
      session({
        secret: 'keyword',
        resave: false,
        saveUninitialized: false,
      }),
    );
    app.use(passport.initialize());
    app.use(passport.session());
    await app.init();
  });

  beforeEach(async () => {
    const user = new Users();

    const hashedPassword = await bcrypt.hash(mokedUser.password, 10);

    user.username = mokedUser.username;
    user.password = hashedPassword;
    user.email = mokedUser.email;

    return user.save();
  });

  afterEach(async () => {
    await Users.destroy({ where: { username: mokedUser.username } });
  });

  it('shoud auth user', async () => {
    const response = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    expect(response.body.user.username).toBe(mokedUser.username);
    expect(response.body.msg).toBe('Logged in');
    expect(response.body.email.email).toBe(mokedUser.email);
  });

  it('shoud auth check', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    const loginCheck = await request(app.getHttpServer())
      .get('/users/login-check')
      .set('Cookie', login.headers['Set-Cookie']);

    expect(loginCheck.body.username).toBe(mokedUser.username);
    expect(loginCheck.body.email).toBe(mokedUser.email);
  });
});
