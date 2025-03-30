// home-management.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home-management',
  templateUrl: './home-management.component.html',
  styleUrls: ['./home-management.component.css'],
})
export class HomeManagementComponent implements OnInit {
  homeData: any = {};
  selectedFile: File | null = null;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.homeService.getHomeData().subscribe({
      next: (data: any) => {
        this.homeData = data;
      },
      error: (err) => console.error('Error fetching data:', err),
    });
  }

  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.homeData.imgPreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onEdit(): void {
    const formData = new FormData();
    formData.append('title', this.homeData.title);
    formData.append('description', this.homeData.description);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.homeService.updateHomeData(this.homeData._id, formData).subscribe({
      next: (response) => {
        console.log('Data updated successfully:', response);
        this.homeData = response;
      },
      error: (err) => console.error('Error updating data:', err),
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('title', this.homeData.title);
    formData.append('description', this.homeData.description);
    if (this.selectedFile) {
      formData.append('img', this.selectedFile);
    }

    this.homeService.createHomeData(formData).subscribe({
      next: (response) => {
        console.log('Data created successfully:', response);
        this.homeData = response;
      },
      error: (err) => console.error('Error creating data:', err),
    });
  }
}
