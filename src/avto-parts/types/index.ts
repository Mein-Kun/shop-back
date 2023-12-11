import { faker } from '@faker-js/faker';
import { Op } from 'sequelize';
import { ApiProperty } from '@nestjs/swagger';

class AvtoParts {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  car_brand: string;

  @ApiProperty({ example: 12345 })
  price: string;

  @ApiProperty({ example: faker.lorem.sentence(2) })
  parts_name: string;

  @ApiProperty({ example: faker.internet.password() })
  vendor_code: string;

  @ApiProperty({ example: faker.internet.password() })
  product_group: string;

  @ApiProperty({ example: faker.lorem.word() })
  name: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  description: string;

  @ApiProperty({ example: faker.lorem.sentence() })
  compatibility: string;

  @ApiProperty({ example: faker.image.city() })
  images: string;

  @ApiProperty({ example: 5 })
  in_stock: number;

  @ApiProperty({ example: true })
  bestsellers: boolean;

  @ApiProperty({ example: false })
  new: boolean;

  @ApiProperty({ example: 123 })
  popularity: number;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2023-01-31T19:46:45.000Z' })
  updatedAt: string;
}

export class PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: AvtoParts, isArray: true })
  rows: AvtoParts;
}

export class Bestsellers extends AvtoParts {
  @ApiProperty({ example: true })
  bestsellers: boolean;
}

export class GetBestsellersResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: AvtoParts, isArray: true })
  rows: Bestsellers;
}

export class NewParts extends AvtoParts {
  @ApiProperty({ example: true })
  new: boolean;
}

export class GetNewResponse extends PaginateAndFilterResponse {
  @ApiProperty({ example: 10 })
  count: number;

  @ApiProperty({ type: AvtoParts, isArray: true })
  rows: NewParts;
}

export class SearchByLetterResponse extends AvtoParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class SearchResponse extends PaginateAndFilterResponse {
  @ApiProperty({ type: SearchByLetterResponse, isArray: true })
  rows: SearchByLetterResponse;
}

export class SearchRequest {
  @ApiProperty({ example: 'r' })
  search: string;
}

export class GetByNameResponse extends AvtoParts {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class GetByNameRequest {
  @ApiProperty({ example: 'Provident incidunt.' })
  name: string;
}

export class FindOneResponse extends AvtoParts {}

export interface IAvtoPartsQuery {
  limit: string;
  offset: string;
  avto: string | undefined;
  parts: string | undefined;
  priceFrom: string | undefined;
  priceTo: string | undefined;
}

export interface IAvtoPartsFilter {
  car_brand: string | undefined;
  product_group: string | undefined;
  price: { [Op.between]: number[] };
}
