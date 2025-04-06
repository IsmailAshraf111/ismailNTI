import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  private languageSubject = new BehaviorSubject<'ar' | 'en'>(
    this.getLanguage()
  );

  language$ = this.languageSubject.asObservable();

  setLanguage(lang: 'ar' | 'en') {
    localStorage.setItem('lang', lang);
    this.languageSubject.next(lang);
  }

  getLanguage(): 'ar' | 'en' {
    return localStorage.getItem('lang') as 'ar' | 'en' || 'en';
  }
  // getLanguage(): 'ar' | 'en' {
  //   return localStorage.getItem('lang')
  //     ? (localStorage.getItem('lang') as 'ar' | 'en')
  //     : 'en';
  // }
}
