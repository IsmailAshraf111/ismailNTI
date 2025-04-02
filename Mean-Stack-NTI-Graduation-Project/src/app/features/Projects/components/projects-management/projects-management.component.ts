import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IProjects } from '../../models/iprojects';
import { InputComponent } from "../../../../shared/input/input.component";

@Component({
    selector: 'app-projects-management',
    templateUrl: './projects-management.component.html',
    styleUrls: ['./projects-management.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule, ReactiveFormsModule, InputComponent]
})
export class ProjectsManagementComponent implements OnInit {
  projectsForm!: FormGroup;
  projects: IProjects[] = [];
  selectedImage: File | null = null;

  private fb = inject(FormBuilder)
  private projectService = inject(ProjectService);
  private route = inject(ActivatedRoute);

 

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
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe((data) => {
      this.projects = data;
    });
  }

  onSubmit(): void {
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
        // this.projectsForm.reset();
        // this.getProjects(); // Refresh the project list after adding a new project
      },
      error: (error) => {
        console.error('Error creating project', error);
      },
    })

  }

  onImageChange(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  // onSubmit(): void {
  //   if (this.projectsForm.valid) {
  //     const formData = new FormData();
  //     // Object.entries(this.projectsForm.value).forEach(([key, value]) => {
  //     //   if (value) {
  //     //     formData.append(key, value as string);
  //     //   }
  //     // });

  //     if (this.selectedImage) {
  //       formData.append('imgUrl', this.selectedImage, this.selectedImage.name);
  //     }

  //     const id = this.projectsForm.value.id;
  //     if (id) {
  //       this.projectService.updateProject(id, formData).subscribe({
  //         next: (response) => {
  //           console.log('Project updated successfully', response);
  //         },
  //         error: (error) => {
  //           console.error('Error updating project', error);
  //         },
  //       });
  //     } 
  //     else {
  //       this.projectService.createProject(formData).subscribe({
  //         next: (response) => {
  //           console.log('Project created successfully', response);
  //         },
  //         error: (error) => {
  //           console.error('Error creating project', error);
  //         },
  //       });
  //     }
  //   }
  // }

  // addProject(formData: FormData): void {
  //   this.projectService.createProject(formData).subscribe(
  //     (response: any) => {
  //       this.projects.push(response.project);
  //       this.projectsForm.reset();
  //     },
  //     (error: any) => {
  //       console.error('Error adding project:', error);
  //     }
  //   );
  // }

  // updateProject(id: string, formData: FormData): void {
  //   this.projectService.updateProject(id, formData).subscribe(
  //     (response: any) => {
  //       const index = this.projects.findIndex((project) => project._id === id);
  //       if (index !== -1) {
  //         this.projects[index] = response.project;
  //       }
  //       this.projectsForm.reset();
  //     },
  //     (error: any) => {
  //       console.error('Error updating project:', error);
  //     }
  //   );
  // }

  // deleteProject(id: string): void {
  //   this.projectService.deleteProject(id).subscribe(
  //     (response: any) => {
  //       this.projects = this.projects.filter((project) => project._id !== id);
  //     },
  //     (error: any) => {
  //       console.error('Error deleting project:', error);
  //     }
  //   );
  // }

  // editProject(project: any): void {
  //   this.projectsForm.setValue({
  //     tech: project.tech,
  //     title: project.title,
  //     description: project.description,
  //     btnOneTitle: project.btnOneTitle,
  //     btnTwoTitle: project.btnTwoTitle,
  //     imgUrl: project.imgUrl,
  //   });
  // }
}
