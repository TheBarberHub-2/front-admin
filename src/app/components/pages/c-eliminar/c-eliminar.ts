import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-c-eliminar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './c-eliminar.html',
  styleUrl: './c-eliminar.scss',
})
export class CEliminar implements OnInit {
  tipo: 'peluqueria' | 'categoria' | 'usuario' | null = null;
  id: number | null = null;

  // Data for display
  itemNombre: string = '';
  itemDetalles: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuariosService: UsuariosService,
    private productoService: ProductosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.id = params['id'];
    });
  }

  eliminar() {
    if (!this.id) return;

    if (this.tipo === 'peluqueria') {
      this.peluqueriasService.eliminarPeluqueria(Number(this.id)).subscribe(() => {
        console.log('Peluquería eliminada');
        this.router.navigate(['/peluquerias']);
      });
    } else if (this.tipo === 'categoria') {
      this.categoriasService.eliminarCategoria(Number(this.id)).subscribe(() => {
        console.log('Categoría eliminada');
        this.router.navigate(['/categorias']);
      });
    } else if (this.tipo === 'usuario') {
      this.usuariosService.eliminarUsuario(Number(this.id)).subscribe(() => {
        console.log('Usuario eliminado');
        this.router.navigate(['/usuarios']);
      });
    } else if (this.tipo === 'productos') {
      this.productoService.eliminarProducto(Number(this.id)).subscribe(() => {
        console.log('Producto eliminado');
        this.router.navigate(['/productos']);
      });
    }
  }
}
