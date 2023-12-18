// import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';

// @Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   constructor(private jwtService: JwtService) {}
//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     console.log(request)
//     return request.isAuthenticated();
//     // return true;
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request)
    return request.isAuthenticated();
    // return true;
  }
}
