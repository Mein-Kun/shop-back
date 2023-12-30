import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthUserDto } from './auth.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Users } from 'src/users/users.model';
import { compare, genSalt, hash } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    console.log(username)
    const user = await this.userService.findOne({
      where: { username: username },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordValid = await compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid pasword');
    }

    return user;
  }
  
  async login(username: string, password: string) {
    const user = await this.userService.findOne({
      where: { username: username },
    });

    const userValid = await this.validateUser(username, password);

    const tokens = await this.issueTokenPair(String(userValid.id));
    console.log(tokens)

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async create(dto: CreateUserDto) {
    const existingByUserName = await this.userService.findOne({
      where: { username: dto.username },
    });

    const existingByEmail = await this.userService.findOne({
      where: { email: dto.email },
    });

    if (existingByUserName) {
      return { warningMessage: 'Пользователь с таким именем уже существует' };
    }

    if (existingByEmail) {
      return { warningMessage: 'Пользователь с таким почтой уже существует' };
    }

    const solt = await genSalt(10);
    const user = new Users({
      username: dto.username,
      passport: await hash(dto.password, solt),
      email: dto.email,
    });
    await user.save();

    const tokens = await this.issueTokenPair(String(user.id));

    return {
      user: this.returnUserFields(user),
      ...tokens,
    };
  }

  async issueTokenPair(id: string) {
    const data = { id };

    const accessToken = await this.jwtService.signAsync(data, {
      expiresIn: '1d',
    });

    return { accessToken };
  }

  returnUserFields(user: Users) {
    return {
      id: user.id,
      username: user.username,
      password: user.password,
      email: user.email,
    };
  }
}
