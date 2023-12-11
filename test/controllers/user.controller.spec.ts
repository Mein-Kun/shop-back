import { beforeEach, afterEach } from 'node:test';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { UsersModule } from 'src/users/users.module';
import { Users } from 'src/users/users.model';
import * as bcrypt from 'bcrypt';
import request from 'supertest';

describe('Users service', () => {
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
        UsersModule,
      ],
    }).compile();

    app = testModule.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await Users.destroy({ where: { username: 'Test' } });
  });

  it('shoud create user', async () => {
    const newUser = {
      username: 'Test',
      email: 'test.357@gmail.com',
      password: 'Test357',
    };

    const response = await request(app.getHttpServer())
      .post('/users/singup')
      .send(newUser);

    const passwordIsValid = await bcrypt.compare(
      newUser.password,
      response.body.password,
    );

    expect(response.body.username).toBe(newUser.username);
    expect(passwordIsValid).toBe(true);
    expect(response.body.email).toBe(newUser.email);
  });
});
