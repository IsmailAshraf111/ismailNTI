import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthAdminService } from '../../../features/Auth/services/auth-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css',
    standalone: true,
    imports: [ FormsModule, RouterLink, CommonModule, RouterLinkActive ],
})
export class NavbarComponent {
  constructor(private authService: AuthAdminService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/adminLogin']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
