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
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'adminLogin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'abuotMe', component: AboutComponent },
  { path: 'contact-me', component: ContactMeComponent },
  { path: 'homeManagement', component: HomeManagementComponent },
  { path: 'projects-meManagement', component: ProjectsManagementComponent },
  { path: 'about-meManagement', component: AboutManagementComponent },
  {
    path: 'contact-me-management',
    component: ContactMeManagementComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [],
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];