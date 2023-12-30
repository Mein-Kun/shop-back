import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   constructor() {}
//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     return request.isAuthenticated();
//     // return true;
//   }
// }
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.isAuthenticated();
  }
}

// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     // console.log(request)
//     return request.isAuthenticated();
//     // return true;
//   }
// }
