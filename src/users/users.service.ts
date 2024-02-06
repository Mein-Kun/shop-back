import { Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private readonly userModel: typeof Users,
  ) {}

  findOne(filter: {
    where: { id?: number; username?: string; email?: string };
  }): Promise<Users> {
    return this.userModel.findOne({ ...filter });
  }

  // async login(username: string, password: string) {
  //   const user = await this.userModel.findOne({ where: { username } });
  //   // console.log(user)
  //   // const userValid = await this.AuthService.validateUser(username, password);
  //   // console.log(userValid)
  //   // const tokens = await this.issueTokenPair(String(userValid.id));
  //   // console.log(tokens)

  //   return user;
  // }

  async create(
    dto: CreateUserDto,
  ): Promise<Users | { warningMessage: string }> {
    const user = new Users();
    const existingByUserName = await this.userModel.findOne({
      where: { username: dto.username },
    });

    const existingByEmail = await this.userModel.findOne({
      where: { email: dto.email },
    });

    if (existingByUserName) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }

    if (existingByEmail) {
      return { warningMessage: 'Пользователь с таким почтой уже существует' };
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    user.username = dto.username
    user.password = hashedPassword
    user.email = dto.email

    return user.save();
  }

}
