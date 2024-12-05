import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { AboutComponent } from './components/about/about.component';
import { ContactMeComponent } from './components/contact-me/contact-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeManagementComponent } from './components/dashboardComponent/home-management/home-management.component';
import { AboutManagementComponent } from './components/dashboardComponent/about-management/about-management.component';
import { ContactMeManagementComponent } from './components/dashboardComponent/contact-me-management/contact-me-management.component';
import { ProjectsManagementComponent } from './components/dashboardComponent/projects-management/projects-management.component';
import { SidebarComponent } from './components/dashboardComponent/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboardComponent/dashboard/dashboard.component';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    ProjectsComponent,
    AboutComponent,
    ContactMeComponent,
    HomeManagementComponent,
    AboutManagementComponent,
    ContactMeManagementComponent,
    ProjectsManagementComponent,
    SidebarComponent,
    DashboardComponent,
    
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
