import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/Navbar/navbar/navbar.component';
import { HomeComponent } from './features/Home/components/home/home.component';
import { FooterComponent } from './shared/Footer/footer/footer.component';
import { LoginComponent } from './features/Auth/components/login/login.component';
import { ProjectsComponent } from './features/Projects/components/projects/projects.component';
import { AboutComponent } from './features/About/components/about/about.component';
import { ContactMeComponent } from './features/Contact-me/components/contact-me/contact-me.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeManagementComponent } from './features/Home/components/home-management/home-management.component';
import { AboutManagementComponent } from './features/About/components/about-management/about-management.component';
import { ContactMeManagementComponent } from './features/Contact-me/components/contact-me-management/contact-me-management.component';
import { ProjectsManagementComponent } from './features/Projects/components/projects-management/projects-management.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
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
