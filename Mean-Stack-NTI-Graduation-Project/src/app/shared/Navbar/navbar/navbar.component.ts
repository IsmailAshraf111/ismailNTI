import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from '../../../features/Auth/services/auth-admin.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
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
