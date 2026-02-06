import { Solicitud } from './solicitud';

export interface SolicitudPeluqueria {
    id: number;
    solicitud: Solicitud;
    municipio: string;
    direccion: string;
    telefono: string;
}
