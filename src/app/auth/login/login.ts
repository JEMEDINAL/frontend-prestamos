import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../auth.service';
import { AlertService } from '../../shared/alerts/alert.service';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private router = inject(Router);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  loginForm = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  sendData() {
    const data = this.loginForm.getRawValue();
    this.authService.login(data).subscribe({
      next: response => {
        this.alertService.showAlert(response.message,200);
        if (this.authService.isAdmin()) {
          
          this.router.navigate(['/admin']);
        } else {
          
          this.router.navigate(['/user-page']);
        }
      },
      error: error => {
        this.alertService.showAlert(error.error.message,400);
      }
    })
  }
}
