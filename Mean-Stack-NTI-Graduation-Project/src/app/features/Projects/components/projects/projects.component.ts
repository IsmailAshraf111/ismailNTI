import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IGetProjects } from '../../models/iget-projects';
import { TooltipModule } from 'primeng/tooltip';
import { LoadingSpinnerComponent } from '../../../../shared/loading-spinner/loading-spinner.component';
import { RouterModule } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    LoadingSpinnerComponent,
    RouterModule,
    TranslatePipe,
    ConfirmDialogModule,
    ToastModule,
  ],
})
export class ProjectsComponent implements OnInit {
  projects: IGetProjects[] = [];
  isLoading: boolean = true;

  constructor(private projectService: ProjectService) {}
  

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.isLoading = true;

    this.projectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data;
        console.log('Projects fetched successfully:', this.projects);
        this.isLoading = false;
      },

      error: (error) => {
        console.error('Error fetching projects:', error);
      },
      complete: () => {
        console.log('Data fetching complete');
      },
    });
  }

  getProjectById(_id: number): void {
    this.projectService.getProjectById(_id).subscribe({
      next: (res) => {
        console.log('ProjectById fetched successfully:', res);
      },
      error: (error) => {
        console.error('Error fetching project:', error);
      },
    });
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }

  deleteProject(_id: number): void {
    console.log(_id);

    this.projectService.deleteProject(_id).subscribe({
      next: (res) => {
        console.log('Project deleted successfully:', res);
        this.getProjects();
      },
      error: (error) => {
        console.error('Error deleting project:', error);
      },
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
