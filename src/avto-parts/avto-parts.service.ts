import { Injectable } from '@nestjs/common';
import { AvtoParts } from './avto-parts.model';
import { InjectModel } from '@nestjs/sequelize';
import { IAvtoPartsFilter, IAvtoPartsQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class AvtoPartsService {
  constructor(
    @InjectModel(AvtoParts)
    private avtoPartsModel: typeof AvtoParts,
  ) {}

  async paginateAndFilter(
    query: IAvtoPartsQuery,
  ): Promise<{ count: number; rows: AvtoParts[] }> {
    const limit = +query.limit;
    const offset = +query.offset * 20;
    const filter = {} as Partial<IAvtoPartsFilter>;

    if (query.priceFrom && query.priceTo) {
      filter.price = {
        [Op.between]: [+query.priceFrom, +query.priceTo],
      };
    }

    if (query.avto) {
      filter.car_brand = JSON.parse(decodeURIComponent(query.avto));
    }

    if (query.parts) {
      filter.product_group = JSON.parse(decodeURIComponent(query.parts));
    }

    return this.avtoPartsModel.findAndCountAll({
      limit,
      offset,
      where: filter,
    });
  }

  async bestsellers(): Promise<{ count: number; rows: AvtoParts[] }> {
    return this.avtoPartsModel.findAndCountAll({
      where: { bestsellers: true },
    });
  }

  async new(): Promise<{ count: number; rows: AvtoParts[] }> {
    return this.avtoPartsModel.findAndCountAll({
      where: { new: true },
    });
  }

  async findOnePart(id: number): Promise<AvtoParts> {
    return this.avtoPartsModel.findOne({
      where: { id },
    });
  }

  async findOneByName(name: string): Promise<AvtoParts> {
    return this.avtoPartsModel.findOne({
      where: { name },
    });
  }

  async searchByString(
    str: string,
  ): Promise<{ count: number; rows: AvtoParts[] }> {
    return this.avtoPartsModel.findAndCountAll({
      limit: 20,
      where: { name: { [Op.like]: `%${str}%` } },
    });
  }
}
