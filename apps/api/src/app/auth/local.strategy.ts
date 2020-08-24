import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

/**
 * A {@link http://www.passportjs.org/ Passport}
 * {@link https://docs.nestjs.com/techniques/authentication#implementing-passport-strategies strategy}
 * to support authenticating through a totally fake user system.
 *
 * Based on
 * {@link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4 this tutorial}
 * for adding passport-local to a Nest app.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    console.log('in validate');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
