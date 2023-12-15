// import { ExecutionContext, Injectable } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

// @Injectable()
// export class LocalAuthGuard extends AuthGuard('local') {
//   async canActivate(context: ExecutionContext) {
//     const result = (await super.canActivate(context)) as boolean;
//     const request = context.switchToHttp().getRequest();

//     await super.logIn(request);
//     return result;
//   }
// }

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return validateRequest(request);
  }
}