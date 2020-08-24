import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@nest-angular-auth/api-interfaces';
import { defer, merge, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface Credentials {
  username: string;
  password: string;
}

const storageKey = 'lamproUser';

/**
 * Service to manage authorization.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly userTrigger$ = new ReplaySubject<User | undefined>();
  readonly currentUser$: Observable<User | undefined>;

  constructor(private http: HttpClient) {
    this.currentUser$ = merge(
      // check whether we are already logged in for an initial value
      defer(() => this.fetchUser()),
      // the users resulting from logging in or out in this tab
      this.userTrigger$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  /**
   * Log in to the authentication system on the server.
   */
  async login(credentials: Credentials) {
    const user = await this.http
      .post<User>('/api/auth/login', credentials)
      .toPromise();

    this.userTrigger$.next(user);

    return user;
  }

  /**
   * Log out of the authentication system on the server.
   */
  async logout() {
    await this.http.post('/api/auth/logout', {}).toPromise();

    this.userTrigger$.next(undefined);
  }

  /**
   * Get the logged-in user from the server. Returns undefined if the user isn't
   * logged in.
   */
  fetchUser() {
    return (
      this.http
        .get<User>('/api/auth/user')
        // when there's an error, it means there's no backend session, so clear
        // the user.
        .pipe(catchError(() => of(undefined)))
    );
  }
}
