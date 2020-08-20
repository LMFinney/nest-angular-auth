import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defer, merge, Observable, of, ReplaySubject } from 'rxjs';
import { catchError, shareReplay } from 'rxjs/operators';

export interface Credentials {
  username: string;
  password: string;
}

interface User {
  username: string;
  displayName: string;
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

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentUser$ = merge(
      // check whether we are already logged in for an initial value
      defer(() => this.fetchUser()),
      // the users resulting from logging in or out in this tab
      this.userTrigger$
    ).pipe(shareReplay({ refCount: true, bufferSize: 1 }));
  }

  /**
   * Log in to the authentication system on the server. Also, store the result
   * in the local storage, so other tabs can be logged in, too.
   */
  async login(credentials: Credentials) {
    const user = await this.http
      .post<User>('/api/auth/login', credentials, {
        // todo: let the interceptor handle this when gql calls are protected
        withCredentials: true,
      })
      .toPromise();

    this.userTrigger$.next(user);

    return user;
  }

  /**
   * Log out of the authentication system on the server. Also, clear the user
   * in the local storage, so other tabs will be logged out, too.
   */
  async logout() {
    await this.http
      .post(
        '/api/auth/logout',
        {},
        {
          // todo: let the interceptor handle this when gql calls are protected
          withCredentials: true,
        }
      )
      .toPromise();

    this.userTrigger$.next(undefined);
  }

  /**
   * Get the logged-in user from the server. Returns undefined if the user isn't
   * logged in.
   */
  fetchUser() {
    return (
      this.http
        .get<User>('/api/auth/user', {
          // todo: let the interceptor handle this when gql calls are protected
          withCredentials: true,
        })
        // when there's an error, it means there's no backend session, so clear
        // the user.
        .pipe(catchError(() => of(undefined)))
    );
  }
}
