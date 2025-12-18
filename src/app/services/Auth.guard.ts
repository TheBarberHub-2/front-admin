import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './Auth.Service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { LoginService } from './login.service';
import { Rol } from '../enums/rol.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private loginService: LoginService) { }

  canActivate(): Observable<boolean> | boolean {
    if (!this.auth.isLogged()) {
      alert('Sesion no iniciada');
      this.router.navigate(['/login']);
      return false;
    }

    return this.loginService.getRol().pipe(
      map(rol => {
        if (rol === Rol.Admin) {
          return true;
        } else {
          alert('No tienes los permisos necesarios');
          this.router.navigate(['/inicio']);
          return false;
        }
      }),
      catchError((err) => {
        console.error('Error al obtener el rol:', err);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
