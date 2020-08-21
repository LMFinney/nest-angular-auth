import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';

import { GqlComponent } from './gql/gql.component';
import { HomeComponent } from './home/home.component';
import { RestComponent } from './rest/rest.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'rest', pathMatch: 'prefix' },
      { path: 'rest', component: RestComponent },
      { path: 'gql', component: GqlComponent },
    ],
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatToolbarModule,
  ],
  declarations: [HomeComponent, RestComponent, GqlComponent],
  exports: [HomeComponent],
})
export class FeatureHomeModule {}
