import { SolicitudPeluqueria } from "./solicitud-peluqueria";
import { SolicitudProducto } from "./solicitud-producto";

export interface SolicitudPendiente {
    peluquerias: SolicitudPeluqueria[];
    productos: SolicitudProducto[];
}