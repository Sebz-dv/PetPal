import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebard.component.html',
  styleUrls: ['./sidebard.component.css'],
})
export class SidebardComponent {
  isMenuOpen = false;
  @Input() userFirstName: string = '';
  userImage: string = '';

  constructor(
    private router: Router,
    private userService: UserService // Inyecta el servicio UserService
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Método para redirigir al perfil
  navigateToProfile() {
    const userEmail = localStorage.getItem('userEmail');  // Obtiene el correo desde el localStorage
    if (userEmail) {
      this.router.navigate(['/profile'], { queryParams: { email: userEmail } }); // Redirige al perfil con el correo como parámetro
    } else {
      this.router.navigate(['/login']); // Si no hay correo, redirige a login
    }
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }
}
