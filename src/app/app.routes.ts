import { Routes } from '@angular/router';
import { CLogin } from './components/pages/c-login/c-login';
import { Inicio } from './components/pages/inicio/inicio';
import { Peluquerias } from './components/pages/peluquerias/peluquerias';
import { Productos } from './components/pages/productos/productos';
import { Categorias } from './components/pages/categorias/categorias';
import { Usuarios } from './components/pages/usuarios/usuarios';
import { CMod } from './components/pages/c-mod/c-mod';
import { CCrear } from './components/pages/c-crear/c-crear';
import { CEliminar } from './components/pages/c-eliminar/c-eliminar';
import { CVer } from './components/pages/c-ver/c-ver';
import { AuthGuard } from './services/Auth.guard';
import { LoginGuard } from './services/login.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  {
    path: 'login',
    component: CLogin,
  },

  {
    path: 'inicio',
    component: Inicio,
    canActivate: [LoginGuard],
  },
  {
    path: 'peluquerias',
    component: Peluquerias,
    canActivate: [AuthGuard],
  },
  {
    path: 'productos',
    component: Productos,
    canActivate: [AuthGuard],
  },
  {
    path: 'categorias',
    component: Categorias,
    canActivate: [AuthGuard],
  },
  {
    path: 'usuarios',
    component: Usuarios,
    canActivate: [AuthGuard],
  },
  {
    path: 'mod',
    component: CMod,
    canActivate: [AuthGuard],
  },
  {
    path: 'eliminar',
    component: CEliminar,
    canActivate: [AuthGuard],
  },
  {
    path: 'ver',
    component: CVer,
    canActivate: [AuthGuard],
  },
  {
    path: 'crear',
    component: CCrear,
    canActivate: [AuthGuard],
  },

  {
    path: '**',
    redirectTo: 'inicio',
  },
];
