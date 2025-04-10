import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthAdminService } from '../../../features/Auth/services/auth-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../../features/Auth/services/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    RouterLinkActive,
    ButtonModule,
    TranslatePipe
  ],
})
export class NavbarComponent {
  language: 'ar' | 'en' = 'ar';

  localStorage = window.localStorage;

  userData: any 
  

  constructor(private router: Router) {
    this.language = this.localizationService.getLanguage();
  }

  private localizationService = inject(LocalizationService);
  private translate = inject(TranslateService);
  private authService = inject(AuthService)

  switchLanguage() {
    this.language = this.language === 'ar' ? 'en' : 'ar';
    this.localizationService.setLanguage(this.language);
    this.translate.use(this.language);
    document.documentElement.dir = this.language === 'ar' ? 'rtl' : 'ltr';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/adminLogin']);
  }

  getUser(){
    this.authService.getUser().subscribe({
      next(value) {
        console.log('user', value);
      this.userData  
        
      },
      error(err) {
        console.log(err, 'usre');
        
      },
    })
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
