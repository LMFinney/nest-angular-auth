import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GqlAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    console.log({ context });
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
  // async canActivate(context: ExecutionContext) {
  //   console.log('GqlAuthGuard');
  //   // login the Rest request
  //   const ctx = GqlExecutionContext.create(context);
  //   console.log('GqlAuthGuard', { context, ctx });
  //   const { req } = ctx.getContext();
  //   console.log('is undefined in guard', req === undefined);

  //   const result = (await super.canActivate(ctx)) as boolean;
  //   console.log('GqlAuthGuard', { result });
  //   // await super.logIn(req);
  //   console.log('exiting GqlAuthGuard');
  //   return result;
  // }

  // getRequest(context: ExecutionContext) {
  //   console.log('in getRequest', { context });
  //   // const ctx = GqlExecutionContext.create(context);
  //   // const req = ctx.getArgByIndex(0);
  //   const { req } = (context as GqlExecutionContext).getContext();
  //   console.log('in getRequest', { reqIsUndefined: req === undefined });
  //   return req;
  // }
}
