import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { RouterLink } from "@angular/router";
import { MyLoans } from '../auth/auth.models';
import { DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertService } from '../shared/alerts/alert.service';

@Component({
  selector: 'app-user-page',
  imports: [RouterLink, DecimalPipe, ReactiveFormsModule],
  templateUrl: './user-page.html',
  styleUrl: './user-page.css',
})
export class UserPage {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  isLoggedIn = this.authService.isAuthenticated;
  loans = signal<MyLoans[]>([]);
  private closeModalBtn = viewChild<ElementRef<HTMLButtonElement>>('closeModalButton');
  requestLoan = new FormGroup({
    amount: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    }),
    plazo: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)]
    })
  });

  ngOnInit(): void {
    if (this.isLoggedIn()) {
      this.loadLoans();
    }
  }
  loadLoans(): void {
    this.authService.myLoans().subscribe({
      next: (data) => {
        this.loans.set(data);
      },
      error: (err) => {
        console.error('Error al cargar los préstamos:', err);
      }
    });
  }

  sendData() {
    const data = this.requestLoan.getRawValue();
    this.authService.newLoan(data).subscribe({
      next: response => {
        this.alertService.showAlert(response.message,201);
        this.loadLoans();
        this.requestLoan.reset();
        const backdrop = document.querySelector('.modal-backdrop');
        this.closeModalBtn()?.nativeElement.click();

      },
      error: error => {
        this.alertService.showAlert(error.error.message,400);
      }
    })
  }

}
