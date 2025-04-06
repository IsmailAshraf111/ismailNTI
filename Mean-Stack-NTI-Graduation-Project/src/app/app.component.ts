import { Component, inject } from '@angular/core';
import { NavbarComponent } from './shared/Navbar/navbar/navbar.component';
import { FooterComponent } from './shared/Footer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LocalizationService } from './core/services/localization.service';
import translationsEN from '../../public/i18n/en.json';
import translationsAR from '../../public/i18n/ar.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [NavbarComponent, FooterComponent, RouterModule],
})
export class AppComponent {
  title = 'ismaMean-Stack-NTI-Graduation-Project';

  private translate = inject(TranslateService);
  private localizationService = inject(LocalizationService);

  constructor() {
    this.translate.addLangs(['ar', 'en']);
    this.translate.setTranslation('ar', translationsAR);
    this.translate.setTranslation('en', translationsEN);
    const currentLang = this.localizationService.getLanguage();
    this.translate.use(currentLang);
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
    // this.primeng.theme.set({
    //   preset: MyPreset,
    //   options: {
    //     darkModeSelector: 'dark',
    //   },
    }
    // const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    // const savedLang = localization.getLanguage();
    // localization.setLanguage(savedLang || browserLang);
  }

