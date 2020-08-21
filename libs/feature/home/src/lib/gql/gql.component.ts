import { Component } from '@angular/core';
import { State, StatesGQL } from '@nest-angular-auth/data-access';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'nest-angular-auth-gql',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>Original States</mat-card-title>
      <mat-card-subtitle>Retrived via GraphQL</mat-card-subtitle>
    </mat-card-header>

    <mat-card-content>
      <mat-selection-list class="mat-elevation-z2">
        <mat-list-item *ngFor="let state of states$ | async">
          {{ state.name }}
        </mat-list-item>
      </mat-selection-list>
    </mat-card-content>
  </mat-card>`,
})
export class GqlComponent {
  readonly states$: Observable<State[]>;

  constructor(statesGQL: StatesGQL) {
    this.states$ = statesGQL.fetch().pipe(map((result) => result.data.states));
  }
}
