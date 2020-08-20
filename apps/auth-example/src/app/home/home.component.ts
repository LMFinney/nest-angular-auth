import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from '@nest-angular-auth/api-interfaces';
import { State, StatesGQL } from '@nest-angular-auth/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nest-angular-auth-home',
  template: `<h2>Message (via REST)</h2>
    <div>{{ (message$ | async).message }}</div>

    <h2>Original States (via GraphQL)</h2>
    <div *ngFor="let state of states$ | async">{{ state.name }}</div>`,
})
export class HomeComponent {
  readonly message$ = this.http.get<Message>('/api/hello');
  readonly states$: Observable<State[]>;

  constructor(private http: HttpClient, statesGQL: StatesGQL) {
    this.states$ = statesGQL.fetch().pipe(map((result) => result.data.states));
  }
}
