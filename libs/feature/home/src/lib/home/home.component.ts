import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@nest-angular-auth/util/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nest-angular-auth-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  readonly currentUser$: Observable<string | undefined>;

  constructor(private authSvc: AuthService, private router: Router) {
    this.currentUser$ = authSvc.currentUser$.pipe(
      map((user) => user?.username)
    );
  }

  async logout() {
    await this.authSvc.logout();
    this.router.navigate(['/login']);
  }
}
