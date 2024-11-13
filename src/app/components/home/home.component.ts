import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environments';
import { Router } from '@angular/router';
import { SidebardComponent } from '../sidebard/sidebard.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';  // Inyecta el servicio

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebardComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  userEmail: string;
  userFirstName: string = '';

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    // Obtiene el correo del usuario desde localStorage (si está presente)
    this.userEmail = localStorage.getItem('userEmail') || '';

    if (this.userEmail) {
      // Guarda el correo en el servicio
      // this.userService.setEmail(this.userEmail);
      this.getUserFirstName(this.userEmail);
    }
  }

  getUserFirstName(email: string) {
    const url = `${environment.endpoint}/user/firstname?email=${email}`;

    this.http.get<{ firstName: string }>(url).subscribe(
      (response) => {
        this.userFirstName = response.firstName;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  // Método para redirigir a profile
  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
