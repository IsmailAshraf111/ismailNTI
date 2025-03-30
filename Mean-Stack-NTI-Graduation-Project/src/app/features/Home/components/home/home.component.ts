// home.component.ts
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements OnInit {
  homeData: any = {};

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData(): void {
    this.homeService.getHomeData().subscribe({
      next: (data: any) => {
        this.homeData = data;

        console.log('Data fetched successfully:', this.homeData.title);
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
