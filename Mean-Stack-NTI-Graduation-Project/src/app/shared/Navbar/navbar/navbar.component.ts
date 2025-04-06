import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthAdminService } from '../../../features/Auth/services/auth-admin.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../../core/services/localization.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
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
  

  constructor(private authService: AuthAdminService, private router: Router) {
    this.language = this.localizationService.getLanguage();
  }

  private localizationService = inject(LocalizationService);
  private translate = inject(TranslateService);

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
