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
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginCheck(access_token: any) {
    // console.log(access_token)
    try {
      const decoded = this.jwtService.verify(access_token);
      return {
        id: decoded.user.id,
        username: decoded.user.username,
        email: decoded.user.email,
      };
    } catch (err) {
      return err;
    }
  }
}
