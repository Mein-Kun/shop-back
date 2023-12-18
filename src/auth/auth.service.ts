import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly jwtService:JwtService) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne({ where: { username } });
    

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if ((user && passwordValid)) {
      return user
    }

    return null;


    // if (user && user.password === password) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }
  async login(user: any) {
    const payload = { username: user.username, sub: user.userid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
