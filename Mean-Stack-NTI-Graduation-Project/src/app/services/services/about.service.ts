import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private apiUrl = 'http://localhost:3000/about';

  constructor(private http: HttpClient) {}

  getAbout(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  updateAbout(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }
}
