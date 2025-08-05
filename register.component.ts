import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user.model';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData: Partial<User> = {
    name: '',
    email: '',
    password: '',
    mobile: '',
    dob: '',
    imageDataUrl: null
  };
  confirmPassword = '';
  calculatedAge?: number;
  showPassword = false;
  showConfirmPassword = false;
  imagePreview: string | null = null;

  constructor(
    private snackBar: MatSnackBar,
    private registerService: RegisterService,
    private router: Router
  ) {}

  // 🎤 Speech-to-Text
  startSpeech(field: keyof User) {
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const spokenText = event.results[0][0].transcript;
      this.userData[field] = spokenText;
      console.log(`Speech result for ${field}:`, spokenText);
    };

    recognition.onerror = (err: any) => {
      console.error('Speech recognition error:', err);
      this.snackBar.open('Speech recognition failed', 'Close', { duration: 2000 });
    };

    recognition.start();
  }

  // 🎂 Age
  calculateAge(dobValue: string | undefined) {
    if (!dobValue) {
      this.calculatedAge = undefined;
      return;
    }
    const today = new Date();
    const dob = new Date(dobValue);
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    this.calculatedAge = age;
    this.userData.age = age;
  }

  // 📷 Image
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

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  toggleShowConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  isPasswordValid(password: string): boolean {
    const simplePatterns = ['123456', 'password', 'abcdef'];
    if (!password) return false;
    if (password.length < 8) return false;
    if (simplePatterns.includes(password.toLowerCase())) return false;
    return true;
  }

  // ✅ Register
  onRegister(form: NgForm) {
    if (!form.valid) {
      this.snackBar.open('Please fill all fields', 'Close', { duration: 3000 });
      return;
    }
    if (!this.isPasswordValid(this.userData.password || '')) {
      this.snackBar.open('Password too weak', 'Close', { duration: 3000 });
      return;
    }
    if (this.confirmPassword !== this.userData.password) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    this.registerService.getUsers().subscribe(users => {
      if (users.some(u => u.email === this.userData.email || u.mobile === this.userData.mobile)) {
        this.snackBar.open('User already exists!', 'Close', { duration: 3000 });
        return;
      }

      this.registerService.addUser(this.userData as User).subscribe(newUser => {
        console.log('User Registered:', JSON.stringify(newUser));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });

        form.resetForm();
        this.imagePreview = null;
        this.calculatedAge = undefined;

        // Navigate to login
        this.router.navigate(['/login']);
      });
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
