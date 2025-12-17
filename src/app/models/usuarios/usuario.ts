import { Rol } from '../../enums/rol.enum';

export interface Usuario {
  email: string;
  nombre: string;
  rol: Rol;
}
