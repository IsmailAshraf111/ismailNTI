import { Routes } from '@angular/router';
import { LoginComponent } from './features/Auth/components/login/login.component';
import { HomeComponent } from './features/Home/components/home/home.component';
import { ProjectsComponent } from './features/Projects/components/projects/projects.component';
import { AboutComponent } from './features/About/components/about/about.component';
import { ContactMeComponent } from './features/Contact-me/components/contact-me/contact-me.component';
import { HomeManagementComponent } from './features/Home/components/home-management/home-management.component';
import { AboutManagementComponent } from './features/About/components/about-management/about-management.component';
import { ProjectsManagementComponent } from './features/Projects/components/projects-management/projects-management.component';
import { ContactMeManagementComponent } from './features/Contact-me/components/contact-me-management/contact-me-management.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/Auth/components/register/register.component';

export const routes: Routes = [
  { path: 'adminLogin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'abuotMe', component: AboutComponent },
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'homeManagement', component: HomeManagementComponent, canActivate:[AuthGuard] },
  { path: 'projects-meManagement', component: ProjectsManagementComponent,  canActivate:[AuthGuard] },
  { path: 'projects-meManagement/:id', component: ProjectsManagementComponent,  canActivate:[AuthGuard] },
  { path: 'create-account', component: RegisterComponent },



  { path: 'about-meManagement', component: AboutManagementComponent,  canActivate:[AuthGuard] },
  {
    path: 'contact-me-management',
    component: ContactMeManagementComponent,  canActivate:[AuthGuard]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];