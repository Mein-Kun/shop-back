import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Users extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;
}
