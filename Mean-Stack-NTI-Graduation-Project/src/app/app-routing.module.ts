import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { HomeManagementComponent } from './components/dashboardComponent/home-management/home-management.component';
import { AboutManagementComponent } from './components/dashboardComponent/about-management/about-management.component';
import { ProjectsManagementComponent } from './components/dashboardComponent/projects-management/projects-management.component';
import { ContactMeManagementComponent } from './components/dashboardComponent/contact-me-management/contact-me-management.component';
import { DashboardComponent } from './components/dashboardComponent/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'adminLogin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'abuotMe', component: AboutComponent },
  { path: 'contact-me', component: ContactMeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,  canActivate: [AuthGuard], 
    children: [
      { path: 'about-meManagement', component: AboutManagementComponent },
      { path: 'projects-meManagement', component: ProjectsManagementComponent },
      { path: 'homeManagement', component: HomeManagementComponent },
      { path: 'contact-me-management', component: ContactMeManagementComponent },
    ],
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
