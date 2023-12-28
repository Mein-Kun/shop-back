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
import { AuthService } from 'src/auth/auth.service';

describe('Users controller', () => {
  let app: INestApplication;
  let authService: AuthService;

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

    authService = testModule.get<AuthService>(AuthService);
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
    const user = (await authService.create(newUser)) as unknown as Users;

    const passwordIsValid = await bcrypt.compare(
      newUser.password,
      user.password,
    );

    expect(user.username).toBe(newUser.username);
    expect(passwordIsValid).toBe(true);
    expect(user.email).toBe(newUser.email);
  });
});
