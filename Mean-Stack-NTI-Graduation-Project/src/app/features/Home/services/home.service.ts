// home.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { IHome } from '../models/ihome';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiUrl = `${environment.apiUrl}home`;

  constructor(private http: HttpClient) {}

  getHomeData(): Observable<IHome> {
    return this.http.get<IHome>(this.apiUrl);
  }

  updateHomeData(id: string, homeData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, homeData);
  }

  createHomeData(homeData: FormData): Observable<IHome> {
    return this.http.post<IHome>(`${this.apiUrl}/`, homeData);
  }
}
