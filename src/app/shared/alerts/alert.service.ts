import { Injectable, signal } from '@angular/core';

export interface AlertaConfig {
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  alert = signal<AlertaConfig | null>(null);

  showAlert(message: string, statusCode: number) {
    let type: 'success' | 'danger' | 'warning' | 'info' = 'info';

    if (statusCode >= 200 && statusCode < 300) {
      type = 'success'; 
    } else if (statusCode === 401 || statusCode === 403) {
      type = 'warning'; 
    } else if (statusCode >= 400 && statusCode < 600) {
      type = 'danger';  
    }

    this.alert.set({ message, type });

    setTimeout(() => {
      this.closeAlert();
    }, 2000);
  }

  closeAlert() {
    this.alert.set(null);
  }
}
