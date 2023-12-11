import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class AvtoParts extends Model {
  @Column
  car_brand: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  parts_name: string;

  @Column
  vendor_code: string;

  @Column
  product_group: string;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  images: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: false })
  bestsellers: boolean;

  @Column({ defaultValue: false })
  new: boolean;

  @Column
  popularity: number;

  @Column
  compatibility: string;
}
