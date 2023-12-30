import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
// import { request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { AuthUserDto } from './auth.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private moduleRef: ModuleRef, private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(username: string, password: string, request: Request): Promise<any> {
    const contextId = ContextIdFactory.getByRequest(request);
    const authService = await this.moduleRef.resolve(AuthService, contextId);
    const user = await authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user
  }

  //   async validate(dto: AuthUserDto): Promise<any> {
  //     const user = await this.authService.validateUser(dto);
  //     console.log(user)
  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //   return user;
  // }
}
