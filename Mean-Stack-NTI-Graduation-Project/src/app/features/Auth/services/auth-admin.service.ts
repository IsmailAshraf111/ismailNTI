import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  logout(): void {
    localStorage.removeItem('token')
  }
  // private apiUrl = 'http://localhost:3000/user';
  private apiUrl = `${environment.apiUrl}users`;

  constructor(private http: HttpClient) {}

  // login(username: String, password: String): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/login`, { username, password });
  // }
  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { 
      username, 
      password 
    }).pipe(
      catchError(error => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData)
  }

}
