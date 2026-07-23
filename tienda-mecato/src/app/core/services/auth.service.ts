import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export type UserRole = 'administrador' | 'cajero';

export interface AuthUser {
  id: number; nombre: string; email: string; rol: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _user = signal<AuthUser | null>(null);
  readonly user = this._user.asReadonly();

  constructor(private router: Router) {}

  login(email: string, password: string, rol: UserRole): boolean {
    if (!email || !password) return false;
    const user: AuthUser = {
      id: 1,
      nombre: rol === 'administrador' ? 'Administrador' : 'Juan Pérez',
      email,
      rol
    };
    this._user.set(user);
    return true;
  }

  logout(): void {
    this._user.set(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean { return this._user() !== null; }
  isAdmin(): boolean { return this._user()?.rol === 'administrador'; }
}