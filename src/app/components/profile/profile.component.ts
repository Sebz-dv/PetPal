import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'; // Importa el servicio
import { Router } from '@angular/router';  // Importa Router para navegación
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = '';  // Variable para almacenar el nombre del usuario
  profileImage: string | ArrayBuffer | null = null;
  petName: string = '';
  petAge: number | null = null;

  constructor(private userService: UserService, private router: Router) {}  // Añadir Router al constructor

  ngOnInit(): void {
    const email = localStorage.getItem('userEmail'); // Recupera el email desde localStorage
    if (email) {
      this.loadUserName(email);  // Si el email está presente, cargar el nombre del usuario
    } else {
      this.router.navigateByUrl('/login');  // Si no hay email, redirigir al login
    }
  }

  // Método para cargar el nombre del usuario usando el servicio
  loadUserName(email: string) {  // Aceptar el email como argumento
    this.userService.getUserByEmail(email).subscribe(
      (response) => {
        this.userName = response.firstname;  // Asigna el nombre del usuario a la variable
      },
      (error) => {
        console.error('Error obteniendo el nombre del usuario:', error);
      }
    );
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    console.log('Datos guardados:', this.profileImage, this.petName, this.petAge);
    // Aquí puedes agregar la lógica para guardar los datos, ya sea en el backend o en localStorage
  }
}
