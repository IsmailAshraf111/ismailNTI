import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-about-management',
    templateUrl: './about-management.component.html',
    styleUrls: ['./about-management.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule]
})
export class AboutManagementComponent implements OnInit {
  about: any = {};

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.loadAboutData();
  }

  loadAboutData(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });
  }

  updateAbout(): void {
    const id = this.about._id;
    this.aboutService.updateAbout(id, this.about).subscribe((updatedData) => {
      console.log('Data updated:', updatedData);
    });
  }
}
