import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';
import { UsersModule } from 'src/users/users.module';
import { AvtoPartsModule } from 'src/avto-parts/avto-parts.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/auth/jwt/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([Favorites]),
    UsersModule,
    AvtoPartsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
