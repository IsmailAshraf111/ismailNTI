import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { IContact } from '../models/icontact';
import { IGetContact } from '../models/iget-contact';

@Injectable({
  providedIn: 'root',
})
export class ContactMeService {
  private apiUrl = `${environment.apiUrl}contact`;
  private http = inject(HttpClient);

  getContact(): Observable<IGetContact> {
    return this.http.get<IGetContact>(this.apiUrl);
  }

  updateContact(id: string, contactData: any): Observable<IContact> {
    return this.http.put<IContact>(`${this.apiUrl}/${id}`, contactData);
  }

  createContact(contactData: IContact): Observable<IContact> {
    return this.http.post<IContact>(`${this.apiUrl}`, contactData);
  }
}
