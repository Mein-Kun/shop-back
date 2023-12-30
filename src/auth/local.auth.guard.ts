import {
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
// export class LocalAuthGuard extends AuthGuard('local') {
//   handleRequest(err: any, user: any, context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const { mobile, password } = request.body;
//     if (err || !user) {
//       if (!mobile) {
//         throw new HttpException({ message: 'no mobile' }, HttpStatus.OK);
//       } else if (!password) {
//         throw new HttpException({ message: 'no pasword' }, HttpStatus.OK);
//       } else {
//         throw err || new UnauthorizedException();
//       }
//     }
//     return user;
//   }
// }
