import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/users';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private MyAppUrl: string;
  private MyApiUrl: string;

  constructor(private http: HttpClient) {
    this.MyAppUrl = environment.endpoint + '/';
    this.MyApiUrl = 'petpal/users/';
  }

  signIn(user: User): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}signin`, user).pipe(
      catchError((error) => {
        console.error('Sign-in error:', error);
        return throwError(error);
      })
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.MyAppUrl}${this.MyApiUrl}`).pipe(
      catchError((error) => {
        console.error('Get users error:', error);
        return throwError(error);
      })
    );
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.MyAppUrl}${this.MyApiUrl}${id}`, user).pipe(
      catchError((error) => {
        console.error(`Update user by ID ${id} error:`, error);
        return throwError(error);
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.MyAppUrl}${this.MyApiUrl}${id}`).pipe(
      catchError((error) => {
        console.error(`Delete user by ID ${id} error:`, error);
        return throwError(error);
      })
    );
  }

  // Método para obtener el email desde localStorage (o desde donde lo estés almacenando)
  getEmail(): string | null {
    return localStorage.getItem('email');
  }

  // Método para obtener el usuario por correo electrónico
  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`http://localhost:9002/user/${email}`);  // Cambiado a la URL correcta
  }
}
