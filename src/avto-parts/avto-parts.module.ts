import { Module } from '@nestjs/common';
import { AvtoPartsController } from './avto-parts.controller';
import { AvtoPartsService } from './avto-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AvtoParts } from './avto-parts.model';

@Module({
  imports: [
    SequelizeModule.forFeature([AvtoParts]),
  ],
  controllers: [AvtoPartsController],
  providers: [AvtoPartsService],
  exports: [AvtoPartsService],
})
export class AvtoPartsModule {}
