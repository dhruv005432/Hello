import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SpeechToTextComponent } from './components/speech-to-text/speech-to-text.component';
import { HistoryComponent } from './components/history/history.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to Home
  { path: 'home', component: HomeComponent },
  { path: 'speech', component: SpeechToTextComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'register',component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'contact',component:ContactComponent},
  { path: 'profile',component: ProfileComponent},
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/home' } // fallback route

  // Lazy-load Admin Module

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
