import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Message } from '@nest-angular-auth/api-interfaces';

@Component({
  selector: 'nest-angular-auth-rest',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Message</mat-card-title>
        <mat-card-subtitle>Retrived via Rest</mat-card-subtitle>
      </mat-card-header>

      <mat-card-content>
        {{ (message$ | async)?.message }}
      </mat-card-content>
    </mat-card>
  `,
})
export class RestComponent {
  readonly message$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient) {}
}
