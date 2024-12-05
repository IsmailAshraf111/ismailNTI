import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../../services/services/about.service';

@Component({
  selector: 'app-about-management',
  templateUrl: './about-management.component.html',
  styleUrls: ['./about-management.component.css'],
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
