import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/projects'; 

  constructor(private http: HttpClient) { }

  createProject(project: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, project);
  }

  updateProject(id: string, project: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project);
  }

  deleteProject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProjects(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
