import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProjects } from '../../models/iprojects';
import { InputComponent } from "../../../../shared/input/input.component";
import { IGetProjects } from '../../models/iget-projects';
import { TranslatePipe } from '@ngx-translate/core';
import {  ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-projects-management',
    templateUrl: './projects-management.component.html',
    styleUrls: ['./projects-management.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule, InputComponent, TranslatePipe, ButtonModule]
})
export class ProjectsManagementComponent implements OnInit {
  projectsForm!: FormGroup;
  projects: IGetProjects[] = [];
  imgPreview: string | null = null;

  selectedImage: File | null = null;
  mode: 'create' | 'update' = 'create';

  private fb = inject(FormBuilder)
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);
  private router = inject(Router)

 

  ngOnInit(): void {
    this.projectsForm = this.fb.group({
      tech: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      btnOneTitle: [''],
      btnTwoTitle: [''],
      imgUrl: [''],
    });
    this.getProjects();
      this.route.queryParams.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.mode = 'update';
        this.projectService.getProjectById(id).subscribe((project) => {
          this.projectsForm.patchValue({
            tech: project.tech,
            title: project.title,
            description: project.description,
            btnOneTitle: project.btnOneTitle,
            btnTwoTitle: project.btnTwoTitle,
            imgUrl: project.imgUrl,
          });
        });
      } else {
        this.mode = 'create';
      }
    });
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  onSubmit(): void {
    if (this.mode === 'create') {
      const formData = new FormData();
      formData.append('tech', this.projectsForm.get('tech')?.value);
      formData.append('title', this.projectsForm.get('title')?.value);
      formData.append('description', this.projectsForm.get('description')?.value);
      formData.append('btnOneTitle', this.projectsForm.get('btnOneTitle')?.value);
      formData.append('btnTwoTitle', this.projectsForm.get('btnTwoTitle')?.value);
      formData.append('imgUrl', this.projectsForm.get('imgUrl')?.value);
  
  
      if (this.selectedImage) {
        formData.append('imgUrl', this.selectedImage);
      }
  
      this.projectService.createProject(formData).subscribe({
        next: (response) => {
          console.log('Project created successfully', response);
          this.router.navigate(['/projects']);
        },
        error: (error) => {
          console.error('Error creating project', error);
        },
      })
    }
    else if (this.mode === 'update') {
      const id = this.route.snapshot.queryParams['id'];
      const formData = new FormData();
      formData.append('tech', this.projectsForm.get('tech')?.value);
      formData.append('title', this.projectsForm.get('title')?.value);
      formData.append('description', this.projectsForm.get('description')?.value);
      formData.append('btnOneTitle', this.projectsForm.get('btnOneTitle')?.value);
      formData.append('btnTwoTitle', this.projectsForm.get('btnTwoTitle')?.value);
  
  
      if (this.selectedImage) {
        formData.append('imgUrl', this.selectedImage);
      }
  
      this.projectService.updateProject(id, formData).subscribe({
        next: (response) => {
          console.log('Project updated successfully', response);
          this.router.navigate(['/projects']);

        },
        error: (error) => {
          console.error('Error updating project', error);
        },
      });
    }
   

  }

  onImageChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }
}
