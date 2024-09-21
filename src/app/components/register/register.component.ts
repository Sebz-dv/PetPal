import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {} // Inyecta Router

  ngOnInit(): void {
    // Initialization logic here
  }

  save(): void {
    this.register();
  }

  register(): void {
    if (this.isFormValid()) {
      const bodyData = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
      };

      this.http.post('http://localhost:9002/user/create', bodyData).subscribe({
        next: (resultData: any) => {
          console.log(resultData); 
          this.toastr.success('¡Registrado Correctamente!', '¡Creado!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        },
        error: (err) => {
          console.error('Error en el registro:', err);
          this.toastr.error(
            'Hubo un error al registrarse. Por favor, inténtelo de nuevo.',
            '¡Error!',
            {
              timeOut: 3000,
              positionClass: 'toast-top-right',
              progressBar: true,
            }
          );
        },
      });
    } else {
      // alert('');
      this.toastr.error(
        'Por favor, complete todos los campos correctamente.',
        '¡Error!',
        {
          timeOut: 3000,
          positionClass: 'toast-top-right',
          progressBar: true,
        }
      );
    }
  }

  isFormValid(): boolean {
    return !!(this.firstname && this.lastname && this.email && this.password);
  }
}
