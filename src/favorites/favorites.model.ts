import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Favorites extends Model {
	
  @Column
  userId: number;

  @Column
  partId: number;

}
