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
import { AvtoPartsModule } from 'src/avto-parts/avto-parts.module';

const mokedUser = {
  username: 'Jhon',
  email: 'jhon.357@gmail.com',
  password: 'Jhon357',
};

describe('Avto Parts controller', () => {
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
        AvtoPartsModule,
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

  it('shoud get one part', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    const response = await request(app.getHttpServer())
      .get('/avto-parts/find/1')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: 1,
        price: expect.any(Number),
        car_brand: expect.any(String),
        parts_name: expect.any(String),
        vendor_code: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        images: expect.any(String),
        in_stock: expect.any(Number),
        bestsellers: expect.any(Boolean),
        new: expect.any(Boolean),
        popularity: expect.any(Number),
        compatibility: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      }),
    );
  });

  it('shoud get bestsellers', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    const response = await request(app.getHttpServer())
      .get('/avto-parts/bestsellers')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          car_brand: expect.any(String),
          parts_name: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestsellers: true,
          new: expect.any(Boolean),
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('shoud get new parts', async () => {
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    const response = await request(app.getHttpServer())
      .get('/avto-parts/new')
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          car_brand: expect.any(String),
          parts_name: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestsellers: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });

  it('shoud search by string', async () => {
    const body = { search: 'La' };
    const login = await request(app.getHttpServer())
      .post('/users/login')
      .send({ username: mokedUser.username, password: mokedUser.password });

    const response = await request(app.getHttpServer())
      .post('/avto-parts/search')
      .send(body)
      .set('Cookie', login.headers['set-cookie']);

    expect(response.body.rows).toBeLessThanOrEqual(20);

    response.body.rows.forEach((element) => {
      expect(element.name.toLowerCase()).toContain(body.search);
    });

    expect(response.body.rows).toEqual(
      expect.arrayContaining([
        {
          id: expect.any(Number),
          price: expect.any(Number),
          car_brand: expect.any(String),
          parts_name: expect.any(String),
          vendor_code: expect.any(String),
          name: expect.any(String),
          description: expect.any(String),
          images: expect.any(String),
          in_stock: expect.any(Number),
          bestsellers: expect.any(Boolean),
          new: true,
          popularity: expect.any(Number),
          compatibility: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]),
    );
  });
});
