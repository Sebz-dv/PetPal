import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-siderbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './siderbar.component.html',
  styleUrls: ['./siderbar.component.css'],
})
export class SiderbarComponent implements OnInit {
  isMenuOpen = false;
  userName: string = '';
  userImage: string = ''; // Puedes añadir lógica para obtener una imagen de usuario si la tienes

  constructor(
    private router: Router,
    private userService: UserService // Inyecta el servicio UserService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

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

  // Método para cargar los datos del usuario
  private loadUserData(): void {
    const userName = +localStorage.getItem('firstname')!;
    console.log('User Name:', userName); // Verifica el ID del usuario

    this.userService.getUserById(userName).subscribe(
      (user: User) => {
        console.log('User Data:', user); // Verifica los datos del usuario recibidos
        this.userName = user.firstname;
      },
      (error) => {
        console.error('Error loading user data:', error); // Verifica los errores
      }
    );
  }
}
