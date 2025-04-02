import { Component } from '@angular/core';
import { NavbarComponent } from './shared/Navbar/navbar/navbar.component';
import { FooterComponent } from './shared/Footer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class AppComponent {
  title = 'Mean-Stack-NTI-Graduation-Project';
}
