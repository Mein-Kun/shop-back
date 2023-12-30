import { Module } from '@nestjs/common';
import { AvtoPartsController } from './avto-parts.controller';
import { AvtoPartsService } from './avto-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AvtoParts } from './avto-parts.model';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([AvtoParts]),
  ],
  controllers: [AvtoPartsController],
  providers: [AvtoPartsService, JwtService],
  exports: [AvtoPartsService],
})
export class AvtoPartsModule {}
