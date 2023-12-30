import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
// import { request } from 'express';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy, "local") {
//   constructor(private moduleRef: ModuleRef) {
//     super({
//       passReqToCallback: true,
//     });
//   }

//   async validate(username: string, password: string): Promise<any> {
//     const contextId = ContextIdFactory.getByRequest(Request);
//     const authService = await this.moduleRef.resolve(AuthService, contextId);
//     const user = await authService.validateUser(username, password);
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user
//   }

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }
  
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(
      username,
      password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

  //   async validate(dto: AuthUserDto): Promise<any> {
  //     const user = await this.authService.validateUser(dto);
  //     console.log(user)
  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //   return user;
  // }

