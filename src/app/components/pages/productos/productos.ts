import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { ProductoSummary } from '../../../models/productos/producto.summary';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos implements OnInit {
  productos: ProductoSummary[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit() {
    this.productosService.getProductos().subscribe((data) => {
      this.productos = data.data;
    });
  }
}
