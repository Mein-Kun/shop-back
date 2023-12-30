import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Favorites } from './favorites.model';
import { UsersModule } from 'src/users/users.module';
import { AvtoPartsModule } from 'src/avto-parts/avto-parts.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Favorites]),
    UsersModule,
    AvtoPartsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, JwtService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
