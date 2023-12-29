import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCardController } from './shopping-card.controller';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingCard } from './shopping-card.modal';
import { UsersModule } from 'src/users/users.module';
import { AvtoPartsModule } from '../avto-parts/avto-parts.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/auth/jwt/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCard]),
    UsersModule,
    AvtoPartsModule,
    JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig,
		}),
  ],
  controllers: [ShoppingCardController],
  providers: [ShoppingCardService, JwtService],
  exports: [ShoppingCardService],
})
export class ShoppingCardModule {}
