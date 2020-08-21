import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * A Guard that hooks into the initial login call to allow the client to authenticate a user in the
 * backend system. This hooks into the {@link http://www.passportjs.org/ Passport} AuthGuard system
 * for its local strategy to process the login. This Guard then logs into the Express session so
 * that later calls can proceed with authentication.
 *
 * Based on
 * {@link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4#initial-authentication this tutorial}
 * for adding passport-local to a Nest app.
 */
@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}
