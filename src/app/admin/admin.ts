import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UsuarioPrestamos } from '../auth/auth.models';
import { CommonModule } from '@angular/common';
import { AlertService } from '../shared/alerts/alert.service';


@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin-page.html',
})
export class Admin {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  usersLoans = signal<UsuarioPrestamos[]>([]);

  loansToEvaluate = computed(() => {
    return this.usersLoans().filter(usuario => 
      usuario.email !== 'admin123@gmail.com' && 
      usuario.prestamos && 
      usuario.prestamos.length > 0 
    );
  });
  ngOnInit(): void {
    this.loadUserLoans()
  }

  loadUserLoans() {
    this.authService.userLoans().subscribe({
      next: (data) => {
        this.usersLoans.set(data);
      },
      error: (err) => {
        console.error('Error al cargar los préstamos:', err);
      }
    })
  }

  changeStatus(prestamoId: number,status:string) {
    this.authService.changeStatus(prestamoId,status).subscribe({
      next: (data) => {
        this.alertService.showAlert(data.message,200);
        this.loadUserLoans()
      },
      error: (err) => {
        this.alertService.showAlert(err.error.message,400);
      }
    })
  }
}
