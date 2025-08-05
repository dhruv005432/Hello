import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  constructor(
    private snackBar: MatSnackBar,
    private contactService: ContactService
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      this.snackBar.open('Please fill all fields correctly!', 'Close', { duration: 3000 });
      return;
    }

    const newContact: Contact = {
      name: form.value.name,
      email: form.value.email,
      mobile: form.value.mobile,
      message: form.value.message,
      date: new Date().toISOString()
    };

    console.log('Contact Form Data:', JSON.stringify(newContact));
    debugger;

    this.contactService.addContact(newContact).subscribe({
      next: (res) => {
        this.snackBar.open('Message sent successfully!', 'Close', { duration: 3000 });
        form.resetForm();
      },
      error: () => {
        this.snackBar.open('Error sending message!', 'Close', { duration: 3000 });
      }
    });
  }
}
