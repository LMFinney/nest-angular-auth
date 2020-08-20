import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) {}

  canActivate(
    _next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authSvc.currentUser$.pipe(
      map((user) => {
        if (!!user) {
          // it's ok to proceed, if the user has logged in
          return true;
        } else {
          // otherwise, redirect to the login screen
          const url = this.router.parseUrl('/login');
          url.queryParams = { returnUrl: state.url };
          return url;
        }
      })
    );
  }
}
