import { Module } from '@nestjs/common';
import { AvtoPartsController } from './avto-parts.controller';
import { AvtoPartsService } from './avto-parts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AvtoParts } from './avto-parts.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/auth/jwt/jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([AvtoParts]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AvtoPartsController],
  providers: [AvtoPartsService, JwtService],
  exports: [AvtoPartsService],
})
export class AvtoPartsModule {}
