import { Routes } from '@angular/router';
import { CLogin } from './components/pages/c-login/c-login';
import { Inicio } from './components/pages/inicio/inicio';
import { Peluquerias } from './components/pages/peluquerias/peluquerias';
import { Categorias } from './components/pages/categorias/categorias';
import { CMod } from './components/pages/c-mod/c-mod';
import { CCrear } from './components/pages/c-crear/c-crear';
import { AuthGuard } from './services/Auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: CLogin
  },

  {
    path: 'inicio',
    component: Inicio,
  },
  {
    path: 'peluquerias',
    component: Peluquerias,
  },
  {
    path: 'categorias',
    component: Categorias,
  },
  {
    path: 'mod',
    component: CMod,
  },
  {
    path: 'crear',
    component: CCrear,
  },

  {
    path: '**',
    redirectTo: 'inicio'
  }
];
