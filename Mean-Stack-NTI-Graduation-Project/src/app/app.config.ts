import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http'; 
import { toastrInterceptor } from './core/interceptors/interceptors/toastr.interceptor';
import { provideToastr } from 'ngx-toastr';
import { TranslateModule, TranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './public/i18n/', '.json');
}


export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptors([toastrInterceptor])
        ),
        provideToastr({
            timeOut: 3000,
            positionClass: 'toast-top-right'
          }),
          provideTranslateService({ defaultLanguage: 'en' }),
          // importProvidersFrom(
          //   TranslateModule.forRoot({
          //     loader: {
          //         provide: TranslateLoader,
          //         useFactory: HttpLoaderFactory,
          //         deps: [HttpClient]
          //     },
          //     defaultLanguage: 'en'
          //   })
          // ),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura
            }
        })
    ]
};






// import { ApplicationConfig } from '@angular/core';
// import { provideRouter } from '@angular/router';
// // import { routes } from './app.routes';

// export const appConfig: ApplicationConfig = {
//   providers: [provideRouter(routes)],
// };
