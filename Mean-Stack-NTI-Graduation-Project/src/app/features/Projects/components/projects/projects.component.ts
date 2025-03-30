import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.css'],
    standalone: false
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      },
    });
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }
}
