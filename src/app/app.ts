import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./shared/navbar/navbar";
import { AlertComponent } from "./shared/alerts/alert-component/alert-component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, AlertComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('loan-front');
}
