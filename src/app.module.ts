import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { AvtoPartsModule } from './avto-parts/avto-parts.module';
import { ShoppingCardModule } from './shopping-card/shopping-card.module';
import { PaymentModule } from './payment/payment.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useClass: SequelizeConfigService,
    }),
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    UsersModule,
    AuthModule,
    AvtoPartsModule,
    ShoppingCardModule,
    PaymentModule,
    FavoritesModule
  ],
})
export class AppModule {}
