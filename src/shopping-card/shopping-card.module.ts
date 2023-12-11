import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ShoppingCardController } from './shopping-card.controller';
import { ShoppingCardService } from './shopping-card.service';
import { ShoppingCard } from './shopping-card.modal';
import { UsersModule } from 'src/users/users.module';
import { AvtoPartsModule } from '../avto-parts/avto-parts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ShoppingCard]),
    UsersModule,
    AvtoPartsModule,
  ],
  controllers: [ShoppingCardController],
  providers: [ShoppingCardService],
  exports: [ShoppingCardService],
})
export class ShoppingCardModule {}
