import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/Auth.Service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-c-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './c-login.html',
  styleUrl: './c-login.scss',
})
export class CLogin implements OnInit {
  loginForm!: FormGroup;
  cargando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contraseña: ['', Validators.required]
    });
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    this.cargando = true;

    const credenciales = {
      usuario: this.loginForm.get('usuario')?.value,
      password: this.loginForm.get('contraseña')?.value
    };

    this.authService.login(credenciales).subscribe({
      next: (res) => {
        // res debe contener .token (Spring Boot devuelve esto)
        this.authService.setToken(res.token);
        this.cargando = false;
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        this.cargando = false;
        console.error('Error al iniciar sesión:', err);
        alert('Usuario o contraseña incorrectos');
      }
    });
  }
}
