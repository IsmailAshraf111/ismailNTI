import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/services/about.service'; 
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  about: any = {};

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
    });
  }
}
