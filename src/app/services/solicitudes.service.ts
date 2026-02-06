import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL } from './URL';
import { Observable } from 'rxjs';
import { Solicitud } from '../models/solicitudes/solicitud';

@Injectable({
    providedIn: 'root',
})
export class SolicitudesService {
    private apiUrl = `${URL}/api/solicitudes`;

    constructor(private http: HttpClient) { }

    getSolicitudesPendientes(): Observable<Solicitud[]> {
        return this.http.get<Solicitud[]>(`${this.apiUrl}/pendientes`);
    }

    getSolicitudById(id: number): Observable<Solicitud> {
        return this.http.get<Solicitud>(`${this.apiUrl}/${id}`);
    }

    aprobarSolicitud(id: number): Observable<Solicitud> {
        return this.http.put<Solicitud>(`${this.apiUrl}/aprobar/${id}`, {});
    }

    rechazarSolicitud(id: number): Observable<Solicitud> {
        return this.http.put<Solicitud>(`${this.apiUrl}/rechazar/${id}`, {});
    }
}
