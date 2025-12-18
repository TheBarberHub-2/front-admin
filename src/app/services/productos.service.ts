import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
import { ProductoSummary } from '../models/productos/producto.summary';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Page<ProductoSummary>> {
    return this.http.get<Page<ProductoSummary>>(this.apiUrl);
  }
  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
