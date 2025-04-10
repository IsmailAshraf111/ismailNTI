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
import { TranslatePipe } from '@ngx-translate/core';
import { environment } from '../../../../../environment/environment';

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
    LoadingSpinnerComponent,
    TranslatePipe
],
})
export class HomeComponent implements OnInit {
  // homeData: IHome = {} as IHome;
  isLoading: boolean = true;
  homeData: IHome = {
    name: 'Your Name',
    descriptionName: 'Your Description Name',
    description: 'Default Description Text',
    img: 'imgs/default-avatar-icon-of-social-media-user-vector.jpg',
  }
  imageBaseUrl: string = environment.backEndApiUrl || environment.apiUrl;
  constructor(private homeService: HomeService) {}

  

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.isLoading = true;
    this.homeService.getHomeData().subscribe({
      next: (data) => {
        this.homeData = data;
        console.log('Data received home:', this.homeData.description);

        this.isLoading = false;
        console.log('Data fetched successfully:', this.homeData.name);
      },
      error: (error) => {
        console.error('Error fetching data homeeeeee:', error);
        this.isLoading = false;

      },
      complete: () => {
        console.log('Data fetching completed');
      },
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
