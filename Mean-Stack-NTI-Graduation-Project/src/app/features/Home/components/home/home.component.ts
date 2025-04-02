// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsComponent } from '../../../Projects/components/projects/projects.component';
import { AboutComponent } from '../../../About/components/about/about.component';
import { ContactMeComponent } from '../../../Contact-me/components/contact-me/contact-me.component';
import { IHome } from '../../models/ihome';
import { ButtonModule } from 'primeng/button';
import { LoadingSpinnerComponent } from "../../../../shared/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    FormsModule,
    CommonModule,
    RouterLink,
    ProjectsComponent,
    AboutComponent,
    ContactMeComponent,
    ButtonModule,
    LoadingSpinnerComponent
],
})
export class HomeComponent implements OnInit {
  homeData: IHome | null = null;
  isLoading: boolean = true;
  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.isLoading = true;
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.homeData = data;
        console.log('Data received:', this.homeData.description);

        this.isLoading = false;
        console.log('Data fetched successfully:', this.homeData.name);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
      complete: () => {
        console.log('Data fetching completed');
      },
    });
  }
}
