import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular Material Modules */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';


/* App Components */
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

/* Custom Components */
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { SpeechToTextComponent } from './components/speech-to-text/speech-to-text.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { UsersComponent } from './components/admin/users/users.component';
import { LogsComponent } from './components/admin/logs/logs.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { SettingsComponent } from './components/admin/settings/settings.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    HomeComponent,
    HistoryComponent,
    SpeechToTextComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ContactComponent,
    ProfileComponent,
    AboutComponent,
    SidebarComponent,
    DashboardComponent,
    UsersComponent,
    LogsComponent,
    ReportsComponent,
    SettingsComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,


    /* Angular Material */
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatStepperModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatListModule,
    MatSidenavModule,
   
  ],
  providers: [
    provideHttpClient(withFetch())  // ✅ enable fetch APIs
  ], // ✅ keep empty for classic NgModule
  bootstrap: [AppComponent]
})
export class AppModule { }
