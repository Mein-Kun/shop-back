import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { username } });
    const passwordValid = await bcrypt.compare(pass, user.password);
    if (user && passwordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.dataValues.username, userId: user.dataValues.id, email: user.dataValues.email, };
    return {
      user: {
        userId: user.dataValues.id,
        username: user.dataValues.username,
        email: user.dataValues.email,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginCheck(access_token: string) {
    try {
      const decoded = this.jwtService.verify(access_token);
      return {
        user: {
          userId: decoded.user.id,
          username: decoded.user.username,
          email: decoded.user.email,
        },
      };
    } catch (err) {
      return err;
    }
  }
}
