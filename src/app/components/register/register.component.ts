import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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
  ) {}

  ngOnInit(): void {
    // Initialization logic here
  }

  save(): void {
    this.register();
  }

  register(): void {
    // Primero verifica si el email ya existe antes de validar cualquier otra cosa
    this.checkEmailExistence(this.email);
  }

  // Nueva función para verificar si el email ya existe
  checkEmailExistence(email: string) {
    const url = `http://localhost:9002/user/check-email?email=${email}`;

    this.http.get<{ exists: boolean }>(url).subscribe({
      next: (response) => {
        if (response.exists) {
          // Si el email ya existe, muestra un mensaje de error específico
          this.toastr.error('El email ya está registrado.', '¡Error!', {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        } else {
          // Si el email no existe, procede a validar los otros campos
          if (this.isFormValid()) {
            if (this.isPasswordValid(this.password)) {
              // Si la contraseña es válida, procede con el registro
              this.proceedWithRegistration();
            } else {
              this.toastr.error(
                'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial.',
                'Contraseña no válida',
                {
                  timeOut: 3000,
                  positionClass: 'toast-top-right',
                  progressBar: true,
                }
              );
            }
          } else {
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
      },
      error: (err) => {
        console.error('Error al verificar email:', err);
        this.toastr.error(
          'Hubo un error al verificar el email. Inténtelo de nuevo.',
          '¡Error!',
          {
            timeOut: 3000,
            positionClass: 'toast-top-right',
            progressBar: true,
          }
        );
      },
    });
  }

  // Si el email no existe, procede con el registro
  proceedWithRegistration() {
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
        this.router.navigateByUrl('/login'); // Redirige al login después del registro
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
  }

  // Valida si todos los campos del formulario están llenos
  isFormValid(): boolean {
    return !!(this.firstname && this.lastname && this.email && this.password);
  }

  // Función para validar que la contraseña tenga al menos una mayúscula, un número y un carácter especial
  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Al menos una mayúscula, un número, un carácter especial, y 8 caracteres
    return passwordRegex.test(password);
  }
}
