import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  isLogin: boolean = true;
  errorMessage: string = '';

  constructor(private router: Router, private http: HttpClient, private toastr: ToastrService) {}

  // login() {
  //   console.log(this.email);
  //   console.log(this.password);
  
  //   const bodyData = {
  //     email: this.email,
  //     password: this.password,
  //   };
  
  //   this.http.post('http://localhost:9002/user/login', bodyData).subscribe(
  //     (resultData: any) => {
  //       console.log('Response:', resultData);
  //       if (resultData && resultData.status) {
  //         // Guarda el token en el almacenamiento local o de sesión
  //         localStorage.setItem('authToken', resultData.token);  // Almacena el token
  
  //         // Muestra el mensaje de éxito
  //         this.toastr.success(
  //           'Bienvenido de nuevo.',
  //           '¡Hola!',
  //           {
  //             timeOut: 3000,
  //             positionClass: 'toast-top-right',
  //             progressBar: true,
  //           }
  //         );
  //         // Redirige al home
  //         this.router.navigateByUrl('/home');
  //       } else {
  //         alert('Incorrect Email or Password');
  //       }
  //     },
  //     (error) => {
  //       console.log('Error login', error);
  //       this.errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
  //     }
  //   );    
  // }  

  login() {
    console.log(this.email);
    console.log(this.password);
  
    const bodyData = {
      email: this.email,
      password: this.password,
    };
  
    this.http.post('http://localhost:9002/user/login', bodyData).subscribe(
      (resultData: any) => {
        console.log('Response:', resultData);
        if (resultData && resultData.status) {
          // Guarda el token en el almacenamiento local o de sesión
          localStorage.setItem('authToken', resultData.token);  // Almacena el token
  
          // Llama al método para obtener los datos del usuario por email
          this.userService.getUserByEmail(this.email).subscribe(
            (user: User) => {
              console.log('User Data:', user); // Muestra los datos del usuario en consola
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
  
          // Muestra el mensaje de éxito
          this.toastr.success(
            'Bienvenido de nuevo.',
            '¡Hola!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
          // Redirige al home
          this.router.navigateByUrl('/home');
        } else {
          alert('Incorrect Email or Password');
        }
      },
      (error) => {
        console.log('Error login', error);
        this.errorMessage = 'Error al iniciar sesión. Por favor, intenta nuevamente.';
      }
    );
  }
  
}
