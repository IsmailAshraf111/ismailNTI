import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: 'adminLogin', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'abuotMe', component: AboutComponent },
  { path: 'contact-me', component: ContactMeComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'about-meManagement', component: AboutManagementComponent },
      { path: 'projects-meManagement', component: ProjectsManagementComponent },
      { path: 'homeManagement', component: HomeManagementComponent },
      {
        path: 'contact-me-management',
        component: ContactMeManagementComponent,
      },
    ],
  },

  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
