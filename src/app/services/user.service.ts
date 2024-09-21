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
    this.MyAppUrl = environment.endpoint;
    this.MyApiUrl = 'petpal/users/';
  }

  /**
   * Sign in a user.
   * @param user - The user credentials for sign in.
   * @returns An Observable with the result of the sign-in operation.
   */
  signIn(user: User): Observable<any> {
    return this.http.post(`${this.MyAppUrl}${this.MyApiUrl}signin`, user).pipe(
      catchError((error) => {
        console.error('Sign-in error:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Get a list of users.
   * @returns An Observable with an array of users.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.MyAppUrl}${this.MyApiUrl}`).pipe(
      catchError((error) => {
        console.error('Get users error:', error);
        return throwError(error);
      })
    );
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user to retrieve.
   * @returns An Observable with the user data.
   */
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.MyAppUrl}${this.MyApiUrl}${email}`).pipe(
      catchError((error) => {
        console.error(`Get user by Email ${email} error:`, error);
        return throwError(error);
      })
    );
  }

  /**
   * Update a user by ID.
   * @param id - The ID of the user to update.
   * @param user - The user data to update.
   * @returns An Observable with the result of the update operation.
   */
  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.MyAppUrl}${this.MyApiUrl}${id}`, user).pipe(
      catchError((error) => {
        console.error(`Update user by ID ${id} error:`, error);
        return throwError(error);
      })
    );
  }

  /**
   * Delete a user by ID.
   * @param id - The ID of the user to delete.
   * @returns An Observable with the result of the delete operation.
   */
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.MyAppUrl}${this.MyApiUrl}${id}`).pipe(
      catchError((error) => {
        console.error(`Delete user by ID ${id} error:`, error);
        return throwError(error);
      })
    );
  }
}
