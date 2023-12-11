import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ShoppingCard } from './shopping-card.modal';
import { UsersService } from 'src/users/users.service';
import { AvtoPartsService } from 'src/avto-parts/avto-parts.service';
import { AddToCardDto } from './dto/add-to-card.dto';
@Injectable()
export class ShoppingCardService {
  constructor(
    @InjectModel(ShoppingCard)
    private shoppingCardModel: typeof ShoppingCard,
    private readonly usersService: UsersService,
    private readonly avtoPartsService: AvtoPartsService,
  ) {}

  async findAll(userId: number): Promise<ShoppingCard[]> {
    const cardAll = this.shoppingCardModel.findAll({ where: { userId, status: null } });

    return cardAll;
  }

  async findOrder(): Promise<ShoppingCard[]> {
    const cardAll = this.shoppingCardModel.findAll({
      where: { status: 'Новый заказ' },
    });

    return cardAll;
  }

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
    card.image = part.images;
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

  async updateCardForAdmin(
    order: number,
    userId: number,
  ): Promise<ShoppingCard[]> {
    const card = await this.shoppingCardModel.findAll({
      where: { userId, status: null },
    });

    card.forEach(async (item) => {
      item.order = order['order'];
      item.status = 'Новый заказ';
      await item.save();
    });

    return card;
  }
}
