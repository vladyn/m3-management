import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuardGuard } from './auth-guard.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuardGuard]
  }
];
