import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component'; 
import { authGuard } from './auth.guard'; // Importa el guard funcional
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard], // Protege la ruta con el guard funcional
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
