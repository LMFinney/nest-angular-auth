import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * A {@link http://www.passportjs.org/ Passport}  guard for GraphQL endpoints to check whether the
 * session is already authenticated.
 *
 * Based on
 * {@link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4#sessions this tutorial}
 * for adding passport-local to a Nest app.
 */
@Injectable()
export class GraphQLAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    console.log('GraphQLAuthenticatedGuard', {
      authenticated: req.isAuthenticated(),
    });

    // Passport adds `isAuthenticated` to the prototype of Request
    return req.isAuthenticated();
  }
}
