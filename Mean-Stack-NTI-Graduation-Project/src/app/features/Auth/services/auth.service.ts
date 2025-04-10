import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    logout(): void {
      localStorage.removeItem('token')
    }
    private apiUrl = `${environment.apiUrl}users`;
  
    private http = inject(HttpClient)
  
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

    getUser(): Observable<any>{
      return this.http.get<any>(`${this.apiUrl}`)
      
    }
}
