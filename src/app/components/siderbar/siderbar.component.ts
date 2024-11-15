import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

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

  // Método para cerrar sesión
  logout() {
    // Elimina el token o datos de autenticación (localStorage o sessionStorage)
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);
  }
}
