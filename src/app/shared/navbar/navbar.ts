import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn  =this.authService.isAuthenticated;


  logout(){
    this.authService.logout()
    this.router.navigate(['/user-page']);    
  }

}
