import { Component, inject } from '@angular/core';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-alert-global',
  standalone: true,
  imports: [],
  templateUrl: './alert.html'
})
export class AlertComponent {
  public alertService = inject(AlertService);
  
}
