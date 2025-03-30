import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-projects-management',
    templateUrl: './projects-management.component.html',
    styleUrls: ['./projects-management.component.css'],
    standalone: false
})
export class ProjectsManagementComponent implements OnInit {
  projectsForm!: FormGroup;
  projects: any[] = [];
  selectedImage: File | null = null;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.projectsForm = new FormGroup({
      tech: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      btnOneTitle: new FormControl(''),
      btnTwoTitle: new FormControl(''),
      imgUrl: new FormControl(''),
    });
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((data: any) => {
      this.projects = data;
    });
  }

  onImageChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  onSubmit(): void {
    if (this.projectsForm.valid) {
      const formData = new FormData();
      Object.entries(this.projectsForm.value).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value as string);
        }
      });

      if (this.selectedImage) {
        formData.append('imgUrl', this.selectedImage, this.selectedImage.name);
      }

      const id = this.projectsForm.value.id;
      if (id) {
        this.projectService.updateProject(id, formData).subscribe({
          next: (response) => {
            console.log('Project updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating project', error);
          },
        });
      } else {
        this.projectService.createProject(formData).subscribe({
          next: (response) => {
            console.log('Project created successfully', response);
          },
          error: (error) => {
            console.error('Error creating project', error);
          },
        });
      }
    }
  }

  addProject(formData: FormData): void {
    this.projectService.createProject(formData).subscribe(
      (response: any) => {
        this.projects.push(response.project);
        this.projectsForm.reset();
      },
      (error: any) => {
        console.error('Error adding project:', error);
      }
    );
  }

  updateProject(id: string, formData: FormData): void {
    this.projectService.updateProject(id, formData).subscribe(
      (response: any) => {
        const index = this.projects.findIndex((project) => project._id === id);
        if (index !== -1) {
          this.projects[index] = response.project;
        }
        this.projectsForm.reset();
      },
      (error: any) => {
        console.error('Error updating project:', error);
      }
    );
  }

  deleteProject(id: string): void {
    this.projectService.deleteProject(id).subscribe(
      (response: any) => {
        this.projects = this.projects.filter((project) => project._id !== id);
      },
      (error: any) => {
        console.error('Error deleting project:', error);
      }
    );
  }

  editProject(project: any): void {
    this.projectsForm.setValue({
      tech: project.tech,
      title: project.title,
      description: project.description,
      btnOneTitle: project.btnOneTitle,
      btnTwoTitle: project.btnTwoTitle,
      imgUrl: project.imgUrl,
    });
  }
}
