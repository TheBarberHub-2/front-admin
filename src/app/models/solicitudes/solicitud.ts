import { Usuario } from '../usuarios/usuario';

export interface Solicitud {
    id: number;
    usuario: Usuario;
    tipo: 'Peluqueria' | 'Producto';
    estado: 'Pendiente' | 'Aprobada' | 'Rechazada' | 'Confirmada';
    fecha: string;
}
