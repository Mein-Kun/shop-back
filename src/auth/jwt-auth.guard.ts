import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
  export class JwtAuthGuard extends AuthGuard('jwt') {
    // canActivate(context: ExecutionContext) {
    //   // const result = super.canActivate(context);
    //   const request = context.switchToHttp().getResponse();
    //   // super.getAuthenticateOptions(request);
    //   // console.log(super.getAuthenticateOptions(request))
    //   // return result;
    //   return super.canActivate(request)
    // }
}
