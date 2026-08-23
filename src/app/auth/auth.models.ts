
export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
}


export interface AuthResponse {
  message: string;
  httpStatus: number;
  jwt: string;
}
export interface ApiResponse {
  message: string;
}


export interface ValidationErrorResponse {
  [fieldName: string]: string;
}

export interface MyLoans {
  "id": number,
  "monto": number,
  "status": string,
  "plazo": number
}

export interface NewLoan {
  "amount":number,
  "plazo":number
}

export interface Prestamo {
  id: number;
  monto: number;
  status: string;
  plazo: number;
}

export interface UsuarioPrestamos {
  id: number;
  email: string;
  prestamos: Prestamo[];
}