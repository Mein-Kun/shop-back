import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.usersService.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid pasword');
    }

    return {
      userId: user.id,
      username: user.username,
      email: user.email,
    };
  }


  // async issueTokenPair(id: string) {
  //   const data = { id };

  //   const accessToken = await this.jwtService.signAsync(data, {
  //     expiresIn: '1d',
  //   });

  //   return { accessToken };
  // }

  // returnUserFields(user: Users) {
  //   return {
  //     id: user.id,
  //     username: user.username,
  //     password: user.password,
  //     email: user.email,
  //   };
  // }
}
