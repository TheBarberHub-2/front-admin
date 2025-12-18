import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';

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
    private usuariosService: UsuariosService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.id = params['id'];

      /*if (
        (this.tipo === 'peluqueria' && this.id) {
        this.loadPeluqueria(String(this.id));
      } else if  this.tipo === 'categoria' &&
        this.id
      ) {
        this.loadCategoria(String(this.id));
      } else if (this.tipo === 'usuario' && this.id) {
        this.loadUsuario(Number(this.id));
      }*/
    });
  }

  /*loadUsuario(id: number) {
    this.usuariosService.getUsuarios().subscribe((usuarios) => {
      const usuario = usuarios.find((u) => u.id == id);
      if (usuario) {
        this.itemNombre = usuario.nombre;
        this.itemDetalles = usuario.email;
      }
    });
  }*/

  /*loadPeluqueria(id: string) {
        this.peluqueriasService.getPeluquerias().subscribe(peluquerias => {
            const peluqueria = peluquerias.find(p => p.id == id || p.usuario_id == id);
            if (peluqueria) {
                this.itemNombre = peluqueria.nombre;
                this.itemDetalles = `${peluqueria.direccion}, ${peluqueria.municipio}`;
            }
        });
    }*/

  /*loadCategoria(id: string) {
    this.categoriasService.getCategorias().subscribe((categorias) => {
      const categoria = categorias.find((c) => c.id == id);
      if (categoria) {
        this.itemNombre = categoria.nombre;
        this.itemDetalles = categoria.descripcion || '';
      }
    });
  }*/

  eliminar() {
    if (!this.id) return;

    if (this.tipo === 'peluqueria') {
      // Logic to delete peluqueria (needs service method)
      console.log('Eliminar peluqueria', this.id);
      // this.peluqueriasService.eliminarPeluqueria(this.id).subscribe(...)
    } else if (this.tipo === 'categoria') {
      // Logic to delete categoria (needs service method)
      console.log('Eliminar categoria', this.id);
      // this.categoriasService.eliminarCategoria(this.id).subscribe(...)
    } else if (this.tipo === 'usuario') {
      this.usuariosService.eliminarUsuario(Number(this.id)).subscribe(() => {
        console.log('Usuario eliminado');
        this.router.navigate(['/usuarios']);
      });
    }
  }
}
