import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    standalone: true,
    imports: [FormsModule, CommonModule],
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
