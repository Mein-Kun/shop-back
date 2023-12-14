import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  SequelizeModuleOptions,
  SequelizeOptionsFactory,
} from '@nestjs/sequelize';
import { AvtoParts } from 'src/avto-parts/avto-parts.model';
import { Users } from 'src/users/users.model';
import { ShoppingCard } from 'src/shopping-card/shopping-card.modal';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createSequelizeOptions(): SequelizeModuleOptions {
    const {
      sql: { dialect, logging, password, host, port, username, database },
    } = this.configService.get('database');

    return {
      dialect,
      logging,
      host,
      port,
      username,
      password,
      database,
      models: [Users, AvtoParts, ShoppingCard],
      autoLoadModels: true,
      synchronize: true,
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
      },
    };
  }
}
