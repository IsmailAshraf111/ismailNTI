import { Component, OnInit } from '@angular/core';
import { AboutService } from '../../services/about.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { IGetAbout } from '../../models/iget-about';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TranslatePipe } from '@ngx-translate/core';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink,
    RouterModule,
    ProgressSpinnerModule,
    FormsModule,
    CommonModule,
    RouterLink,
    ButtonModule,
    TranslatePipe
  ],
})
export class AboutComponent implements OnInit {
  about: IGetAbout = {} as IGetAbout;
  isLoading = true;
  error = '';

  constructor(private aboutService: AboutService) {}

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe((data) => {
      this.about = data;
      console.log(this.about);
    });
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
