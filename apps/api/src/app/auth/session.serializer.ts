import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

/**
 * A {@link http://www.passportjs.org/ Passport} hook to convert the saved payload into the user
 * object, and vice versa. In our case, the Session object will contain the entire user in its
 * payload, but this is the place that could allow the system to store just an id in the Session
 * object.
 *
 * Based on
 * {@link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4#sessions this tutorial}
 * for adding passport-local to a Nest app.
 */
@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error | null, user: any) => void): any {
    done(null, user);
  }

  deserializeUser(
    payload: any,
    done: (err: Error | null, payload: string) => void
  ): any {
    done(null, payload);
  }
}
