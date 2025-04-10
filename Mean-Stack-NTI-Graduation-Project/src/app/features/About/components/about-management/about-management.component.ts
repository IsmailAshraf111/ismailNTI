import { Component, inject, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { ChipModule } from 'primeng/chip';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { IAbout } from '../../models/iabout';
import { IGetAbout } from '../../models/iget-about';
import { InputComponent } from '../../../../shared/input/input.component';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-about-management',
  templateUrl: './about-management.component.html',
  styleUrls: ['./about-management.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ChipModule,
    InputComponent,
    FormsModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    TooltipModule,
    RouterModule,
    TranslatePipe
  ],
})
export class AboutManagementComponent implements OnInit {
  about: IAbout[] = [];
  selectedFile: File | null = null;
  aboutData: IGetAbout = {} as IGetAbout;

  aboutForm!: FormGroup;

  private aboutService = inject(AboutService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.aboutForm = this.fb.group({
      description: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      databases: ['', [Validators.required]],
      otherSkills: ['', [Validators.required]],
      tools: ['', [Validators.required]],
      frameworks: ['', [Validators.required]],
      _id: [''],
    });
  }

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.aboutData = data;
      this.aboutForm.patchValue({
        _id: this.aboutData._id,
        description: data.description,
        languages: data.languages,
        databases: data.databases,
        otherSkills: data.otherSkills,
        tools: data.tools,
        frameworks: data.frameworks,
      });
      console.log('iddddddddddddddddddddddddddd', this.aboutData._id);
      console.log('Form ID before update:', this.aboutForm.value._id);
    });
  }

  // onFileSelected(event: any): void {
  //   this.selectedFile = event.target.files[0];
  // }

  // onSubmit(): void {
  //   if (this.aboutForm.invalid) return;

  //   const formData: IAbout = {
  //     description: this.aboutForm.value.description,
  //     languages: this.aboutForm.value.languages,
  //     databases: this.aboutForm.value.databases,
  //     otherSkills: this.aboutForm.value.otherSkills,
  //     tools: this.aboutForm.value.tools,
  //     frameworks: this.aboutForm.value.frameworks,
  //   };

  //   this.aboutService.createAbout(formData).subscribe({
  //     next: (res) => {
  //       console.log('About created successfully:', res);
  //       this.router.navigate(['/about']);
  //     },
  //     error: (error) => {
  //       console.error('Error creating about:', error);
  //     },
  //   });

  // }

  onSubmit(): void {
    console.log('Form ID before update: on', this.aboutForm.value._id);

    if (this.aboutForm.invalid) return;

    const formData: IAbout = {
      description: this.aboutForm.value.description,
      languages: this.aboutForm.value.languages,
      databases: this.aboutForm.value.databases,
      otherSkills: this.aboutForm.value.otherSkills,
      tools: this.aboutForm.value.tools,
      frameworks: this.aboutForm.value.frameworks,
    };
    const formDataUpdated: IAbout = {
      ...formData,
      _id: this.aboutForm.value._id,
    };

    if (formDataUpdated._id) {
      this.aboutService
        .updateAbout(this.aboutData._id, formDataUpdated)
        .subscribe({
          next: (res) => {
            console.log('About updated successfully:', res);
            this.router.navigate(['/abuotMe']);
          },
          error: (error) => {
            console.error('Error updating about:', error);
          },
        });
    } else {
      this.aboutService.createAbout(formData).subscribe({
        next: (res) => {
          console.log('About created successfully:', res);
          this.router.navigate(['/abuotMe']);
        },
        error: (error) => {
          console.error('Error creating about:', error);
        },
      });
    }
  }
}
