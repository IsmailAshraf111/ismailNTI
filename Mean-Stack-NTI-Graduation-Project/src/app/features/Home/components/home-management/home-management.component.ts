// home-management.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IGetHome } from '../../models/iget-home';
import { Router } from '@angular/router';
import { InputComponent } from '../../../../shared/input/input.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IHome } from '../../models/ihome';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home-management',
  templateUrl: './home-management.component.html',
  styleUrls: ['./home-management.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    FloatLabelModule,
    InputTextModule,
    TranslatePipe
  ],
})
export class HomeManagementComponent implements OnInit {
  homeData: IGetHome = {} as IGetHome;
  CreateHome: IHome = {} as IHome;
  formData!: FormGroup;
  selectedFile: File | null = null;

  private homeService = inject(HomeService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  constructor() {
    this.formData = this.fb.group({
      name: ['', Validators.required],
      descriptionName: ['', Validators.required],
      description: ['', Validators.required],
      img: [null],
      _id: [''],
    });
  }
  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.homeData = data;
        this.formData.patchValue({
          name: this.homeData.name,
          descriptionName: this.homeData.descriptionName,
          description: this.homeData.description,
          _id: this.homeData._id,
        });
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files?.[0] ?? null;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        if (this.homeData) {
          this.homeData.imgPreview = reader.result as string;
        }
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
  onEdit(): void {
    // if (this.formData.invalid) return;
    const formData = new FormData();
    formData.append('name', this.formData.value.name);
    formData.append('descriptionName', this.formData.value.descriptionName);
    formData.append('description', this.formData.value.description);

    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }
    const id = this.formData.value._id;

    if (id) {
      if (this.homeData && this.homeData._id) {
        this.homeService.updateHomeData(this.homeData._id, formData).subscribe({
          next: (response) => {
            console.log('Data updated successfully:', response);
            this.homeData = response;
            this.router.navigate(['/home']);
          },
          error: (err) => console.error('Error updating data:', err),
        });
      }
    } else {
      this.homeService.createHomeData(formData).subscribe({
        next: (response) => {
          console.log('Data updated successfully:', response);
          this.router.navigate(['/home']);
        },
        error: (err) => console.error('Error updating data:', err),
      });
    }
  }

  hasValue(): boolean {
    return !!this.formData?.value || this.formData?.value === 0;
  }
}
