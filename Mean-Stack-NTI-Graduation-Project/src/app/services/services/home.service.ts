// home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = 'http://localhost:3000/home';

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateHomeData(id: string, homeData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, homeData);
  }
}
