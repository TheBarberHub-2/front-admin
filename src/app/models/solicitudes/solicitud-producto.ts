import { Solicitud } from './solicitud';
import { Categoria } from '../categorias/categoria';

export interface SolicitudProducto {
    id: number;
    solicitud: Solicitud;
    nombre: string;
    precio: number;
    duracion: number;
    categoria: Categoria;
}
