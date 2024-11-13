import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],  // Aplica el guard a la ruta de profile
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],  // Aplica el guard a la ruta de home
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
