import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  sidebarItems = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Register', icon: 'person_add', route: '/register' },
    { label: 'Login', icon: 'login', route: '/login' },
    { label: 'Profile', icon: 'account_circle', route: '/profile' },
    { label: 'Speech-to-Text', icon: 'mic', route: '/speech' },
    { label: 'History', icon: 'history', route: '/history' },
    { label: 'About', icon: 'info', route: '/about' },
    { label: 'Admin', icon: 'admin_panel_settings', route: '/admin' }
  ];
}
  