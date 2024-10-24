import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuardGuard } from './auth-guard.guard';
import { AppComponent } from './app.component';
import { AudioPlayerComponent } from './audio-player/audio-player.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuardGuard]
  },
  {
    path: 'audio-player',
    component: AudioPlayerComponent
  },
];
