import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users
  ) {}

  findOne(filter: {
    where: { id?: number; username?: string; email?: string };
  }): Promise<Users> {
    return this.userModel.findOne({ ...filter });
  }

}
