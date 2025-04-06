import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { IAbout } from '../models/iabout';
import { IGetAbout } from '../models/iget-about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
private apiUrl =` ${environment.apiUrl}about`

private http = inject(HttpClient)

  getAbout(): Observable<IGetAbout> {
    return this.http.get<IGetAbout>(this.apiUrl);
  }

  updateAbout(id: string, data: IAbout): Observable<IAbout[]> {
    return this.http.put<IAbout[]>(`${this.apiUrl}/${id}`, data);
  }

  createAbout(data: IAbout): Observable<IAbout[]> {
    return this.http.post<IAbout[]>(this.apiUrl, data);
  }
}
