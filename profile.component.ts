import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface UserProfile {
  name: string;
  email: string;
  mobile: string;
  dob: string;
  age?: number;
  imageDataUrl?: string | null;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: UserProfile = {
    name: '',
    email: '',
    mobile: '',
    dob: '',
    age: undefined,
    imageDataUrl: null
  };
  imagePreview: string | null = null;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.userData = JSON.parse(userJson);
      this.imagePreview = this.userData.imageDataUrl || null;
    }
  }

  calculateAge(dobValue: string) {
    if (!dobValue) return;
    const today = new Date();
    const dob = new Date(dobValue);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    this.userData.age = age;
  }

  onImagePicked(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
      this.userData.imageDataUrl = this.imagePreview;
    };
    reader.readAsDataURL(file);
  }

  onUpdate() {
    localStorage.setItem('currentUser', JSON.stringify(this.userData));
    this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.snackBar.open('Logged out successfully!', 'Close', { duration: 3000 });
    // Redirect to login
    window.location.href = '/login';
  }
}
