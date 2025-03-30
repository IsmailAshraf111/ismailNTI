import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactMeService {
  private apiUrl = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  getContact(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateContact(id: string, contactData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, contactData);
  }

  createContact(contactData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, contactData);
  }
}


