import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '@nest-angular-auth/util/auth';

@Component({
  selector: 'nest-angular-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  readonly loginGroup: FormGroup;
  error?: string;
  loading = false;

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    fb: FormBuilder
  ) {
    this.loginGroup = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    this.error = '';
    this.loading = true;
    try {
      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') ?? '/';
      await this.authSvc.login(this.loginGroup.value);
      this.router.navigate([returnUrl]);
    } catch (e) {
      this.error = 'Username or password is incorrect';
    } finally {
      this.loading = false;
    }
  }
}
