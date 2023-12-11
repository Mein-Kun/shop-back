import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class ShoppingCard extends Model {
  @Column
  userId: number;

  @Column
  partId: number;

  @Column
  car_brand: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  parts_name: string;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: null })
  status: string;

  @Column({ defaultValue: 0 })
  order: number;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
