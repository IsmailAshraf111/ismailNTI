import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { IProjects } from '../models/iprojects';
import { IGetProjects } from '../models/iget-projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
    private apiUrl = `${environment.apiUrl}projects`;
  

  constructor(private http: HttpClient) { }

  createProject(project: FormData): Observable<IProjects> {
    return this.http.post<IProjects>(`${this.apiUrl}`, project);
  }

  updateProject(id: number, data: FormData): Observable<IProjects> {
    return this.http.put<IProjects>(`${this.apiUrl}/${id}`, data);
  }

  deleteProject(id: number): Observable<IGetProjects> {
    return this.http.delete<IGetProjects>(`${this.apiUrl}/${id}`);
  }

  getProjects(): Observable<IGetProjects[]> {
    return this.http.get<IGetProjects[]>(this.apiUrl);
  }

  getProjectById(id: number): Observable<IProjects> {
    return this.http.get<IProjects>(`${this.apiUrl}/${id}`);
  }
}
