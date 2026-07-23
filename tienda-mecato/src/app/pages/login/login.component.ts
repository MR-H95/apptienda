import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, UserRole } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  recoveryForm: FormGroup;
  errorMsg = '';
  recoveryError = '';
  recoverySent = false;
  modoRecuperacion = false;
  showPassword = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email:    ['admin@tienda.local', [Validators.required, Validators.email]],
      password: ['admin123',           [Validators.required, Validators.minLength(6)]],
      rol:      ['administrador',      Validators.required]
    });
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.loginForm.controls; }
  get recoveryFields() { return this.recoveryForm.controls; }

  mostrarRecuperacion(): void {
    this.modoRecuperacion = true;
    this.recoverySent = false;
    this.recoveryError = '';
    this.recoveryForm.reset({ email: this.loginForm.get('email')?.value ?? '' });
  }

  volverAlLogin(): void {
    this.modoRecuperacion = false;
    this.recoverySent = false;
    this.recoveryError = '';
  }

  solicitarRecuperacion(): void {
    this.recoveryError = '';
    if (this.recoveryForm.invalid) {
      this.recoveryForm.markAllAsTouched();
      return;
    }
    this.recoverySent = true;
  }

  onSubmit(): void {
    this.errorMsg = '';
    if (this.loginForm.invalid) { this.loginForm.markAllAsTouched(); return; }
    const { email, password, rol } = this.loginForm.value;
    const ok = this.auth.login(email, password, rol as UserRole);
    if (ok) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMsg = 'Correo o contraseña incorrectos. Intente de nuevo.';
    }
  }
}