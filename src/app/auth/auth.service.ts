import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  MyLoans,
  NewLoan,ApiResponse
} from './auth.models';

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly tokenSignal = signal<string | null>(
    localStorage.getItem(this.TOKEN_KEY)
  );

  readonly isAuthenticated = computed(() => {
    const token = this.tokenSignal();

    if (!token) {
      return false;
    }

    return !this.isTokenExpired(token);
  });

  constructor(private http: HttpClient) {}

  login(data: LoginDto): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      'http://localhost:8080/api/auth/login',
      data
    ).pipe(
      tap(response => {
        this.saveToken(response.jwt);
      })
    );
  }

  register(data: RegisterDto): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(
      'http://localhost:8080/api/auth/register',
      data
    ).pipe(
      tap(response => {
        this.saveToken(response.jwt);
      })
    );
  }

  myLoans():Observable<MyLoans[]> {
    return this.http.get<MyLoans[]>(
      'http://localhost:8080/prestamos/my-loans'
    )
  }

  newLoan(data:NewLoan): Observable<ApiResponse>{
    return this.http.post<ApiResponse>('http://localhost:8080/prestamos',data)
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.tokenSignal.set(null);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  getUser(): JwtPayload | null {

    const token = this.getToken();

    if (!token || this.isTokenExpired(token)) {
      return null;
    }

    try {
      return jwtDecode<JwtPayload>(token);
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    return this.getUser()?.role ?? null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'ADMIN';
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    this.tokenSignal.set(token);
  }

  private isTokenExpired(token: string): boolean {
    try {

      const decoded = jwtDecode<JwtPayload>(token);

      return decoded.exp * 1000 < Date.now();

    } catch {

      return true;

    }
  }
}