import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express'

const AUTH_TYPE = 'bearer'

export interface HttpRequest extends Request {
}
@Injectable()
// export class AuthenticatedGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
//     return request.isAuthenticated();
//     // return true;
//   }
// }

export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<HttpRequest>()
    return this.hasValidApiKey(request)
  }

  getAuthorization(headers: HttpRequest['headers']): string | null {
    const { authorization } = headers
    if (!authorization) {
      return null
    }

    if (typeof authorization === 'string') {
      return authorization
    }
    return authorization[0]
  }

  hasValidApiKey(request: HttpRequest): boolean {
    const authorization = this.getAuthorization(request.headers)
    if (!authorization) {
      return false
    }

    if (!authorization.toLowerCase().startsWith(AUTH_TYPE)) {
      return false
    }

    const apiKey = authorization.slice(AUTH_TYPE.length + 1)
    if (!apiKey) {
      return false
    }

    return true
  }
}
