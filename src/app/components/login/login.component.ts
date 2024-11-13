import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  errorMessage: string = '';

  showPassword: boolean = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  login() {
    console.log(this.email); // Para debugging, puedes eliminar esto en producción
    const bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post('http://localhost:9002/user/login', bodyData).subscribe(
      (resultData: any) => {
        console.log('Response:', resultData);
        if (resultData && resultData.status) {
          // Guarda el email del usuario y el token de autenticación en localStorage
          localStorage.setItem('userEmail', this.email);
          localStorage.setItem('authToken', resultData.token);

          // Muestra un mensaje de bienvenida
          this.toastr.success('Bienvenido de nuevo.', '¡Hola!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });

          // Redirige a la página principal después de hacer login
          this.router.navigateByUrl('/home');
        } else {
          // Si el login falla, muestra un mensaje de error
          this.toastr.error(
            'Correo electrónico o contraseña incorrectos',
            'Error',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
        }
      },
      (error) => {
        console.log('Error en login:', error);
        this.toastr.error(
          'Error al iniciar sesión. Por favor, intenta nuevamente.',
          'Error',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          }
        );
      }
    );
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
