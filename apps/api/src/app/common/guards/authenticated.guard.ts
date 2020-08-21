import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';

/**
 * A {@link http://www.passportjs.org/ Passport} guard to protect endpoints after the user has
 * logged in.
 *
 * Based on
 * {@link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4#sessions this tutorial}
 * for adding passport-local to a Nest app.
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
