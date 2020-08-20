import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '@nest-angular-auth/feature/auth';
import { AuthGuard } from '@nest-angular-auth/util/auth';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: async () =>
      (await import('@nest-angular-auth/feature/home')).FeatureHomeModule,
    canActivate: [AuthGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
