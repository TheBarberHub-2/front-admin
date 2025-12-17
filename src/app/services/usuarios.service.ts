import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private apiUrl = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    getUsuarios(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/usuarios`).pipe(
            catchError(error => {
                console.error('Error fetching usuarios:', error);
                return of([]);
            })
        );
    }
    crearUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/usuarios`, usuario);
    }
    verUsuario(id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/usuarios/${id}`);
    }
    modificarUsuario(id: number, usuario: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/usuarios/${id}`, usuario);
    }
    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/usuarios/${id}`);
    }
}
