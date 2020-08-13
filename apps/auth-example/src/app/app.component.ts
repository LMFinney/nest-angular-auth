import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@nest-angular-auth/api-interfaces';
import { State, StatesGQL } from '@nest-angular-auth/data-access';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'nest-angular-auth-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly hello$ = this.http.get<Message>('/api/hello');
  readonly states$: Observable<State[]>;

  constructor(private http: HttpClient, statesGQL: StatesGQL) {
    this.states$ = statesGQL.fetch().pipe(map((result) => result.data.states));
  }
}
