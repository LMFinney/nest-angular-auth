import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from '@nest-angular-auth/api-interfaces';
import { StatesGQL } from '@nest-angular-auth/data-access';
import { AuthService } from '@nest-angular-auth/util/auth';
import { map } from 'rxjs/operators';

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
    private statesGQL: StatesGQL,
    private http: HttpClient,
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

  message() {
    this.http.get<Message>('/api/hello').subscribe(console.log);
  }

  states() {
    this.statesGQL
      .fetch()
      .pipe(map((result) => result.data.states))
      .subscribe(console.log);
  }
}
