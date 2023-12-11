import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCard } from './shopping-card.modal';
import { UsersService } from 'src/users/users.service';
import { AvtoPartsService } from 'src/avto-parts/avto-parts.service';
import { AddToCardDto } from './dto/add-to-card.dto';
import { CardAdminDto } from './dto/card-admin.dto';
// import { CardAdminDto } from './dto/card-admin.dto';

@Injectable()
export class ShoppingCardService {
  constructor(
    @InjectModel(ShoppingCard)
    private shoppingCardModel: typeof ShoppingCard,
    private readonly usersService: UsersService,
    private readonly avtoPartsService: AvtoPartsService,
  ) {}

  async findAll(userId: number): Promise<ShoppingCard[]> {
    return this.shoppingCardModel.findAll({ where: { userId } });
  }

  // async findOfAdmin(order: number): Promise<ShoppingCard[]> {
  //   return this.shoppingCardModel.findAll({ where: { order } });
  // }

  async add(addToCardDto: AddToCardDto) {
    const card = new ShoppingCard();
    const user = await this.usersService.findOne({
      where: { username: addToCardDto.username },
    });
    const part = await this.avtoPartsService.findOne(addToCardDto.partId);

    card.userId = user.id;
    card.partId = part.id;
    card.car_brand = part.car_brand;
    card.parts_name = part.parts_name;
    card.price = part.price;
    card.in_stock = part.in_stock;
    card.image = JSON.parse(part.images)[0];
    card.name = part.name;
    card.total_price = part.price;

    return card.save();
  }

  async updateCount(count: number, partId: number): Promise<{ count: number }> {
    await this.shoppingCardModel.update({ count }, { where: { partId } });

    const part = this.shoppingCardModel.findOne({ where: { partId } });
    return { count: (await part).count };
  }

  async updateTotalPrice(
    total_price: number,
    partId: number,
  ): Promise<{ total_price: number }> {
    await this.shoppingCardModel.update({ total_price }, { where: { partId } });

    const part = this.shoppingCardModel.findOne({ where: { partId } });
    return { total_price: (await part).total_price };
  }

  async remove(partId: number): Promise<void> {
    const part = this.shoppingCardModel.findOne({ where: { partId } });
    (await part).destroy();
  }

  async removeAll(userId: number): Promise<void> {
    await this.shoppingCardModel.destroy({ where: { userId } });
  }

  // async orderStatus(order: number, cardAdminDto: CardAdminDto) {
  //   const card = await this.shoppingCardModel.findOne({
  //     where: { order }
  //   });
  //   // const part = await this.shoppingCardModel.findOne(cardAdminDto.status);

  //   // card.status = part.status

  //   return card.save();
  // }

  async order(order: number, userId: number): Promise<ShoppingCard[]> {
    const card = await this.shoppingCardModel.findAll({
      where: { userId }
    });

    // const user = await this.shoppingCardModel.findOne({
    //   where: { userId: cardAdminDto.userId },
    // });

    // const date = Date.now()

    try {
      card.forEach((item) => {
        item.order = order
        item.userId = 0
        item.save()
      })
    } catch (error) {
      console.log((error as Error).message)}

    // card.forEach((item) => {
    //   item.order = order
    //   item.userId = 0
    //   item.save()
    // })

    return card;
  }
}
