import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alerts/alert.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  registerForm = new FormGroup({
    email: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required, Validators.email] 
    }),
    password: new FormControl('', { 
      nonNullable: true, 
      validators: [Validators.required] 
    })
  });
  
    registerData() {
      if (this.registerForm.invalid) {
    this.registerForm.markAllAsTouched();
    return;
  }
  const data = this.registerForm.getRawValue();
  this.authService.register(data).subscribe({
    next: response => {

      this.alertService.showAlert(response.message,200);
      this.router.navigate(['/user-page']);

    },
    error: error => {
      this.alertService.showAlert(error.error.message,400);
    }
  });
    }
}
