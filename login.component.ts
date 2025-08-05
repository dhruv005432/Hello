import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    identifier: '', // email or mobile
    password: ''
  };

  constructor(
    private registerService: RegisterService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onLogin(form: NgForm) {
    if (!form.valid) {
      this.snackBar.open('Please enter all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.registerService.getUsers().subscribe((users: User[]) => {
      const user = users.find(
        u =>
          (u.email === this.loginData.identifier || u.mobile === this.loginData.identifier) &&
          u.password === this.loginData.password
      );

      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.snackBar.open('Login successful!', 'Close', { duration: 3000 });
        this.router.navigate(['/profile']);
      } else {
        this.snackBar.open('Invalid credentials!', 'Close', { duration: 3000 });
      }
    });
  }
}
