import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthAdminService {
  logout(): void {
    localStorage.removeItem('token')
  }
  private apiUrl = 'http://localhost:3000/adminLogin';
  constructor(private http: HttpClient) {}

  login(username: String, password: String): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

}
