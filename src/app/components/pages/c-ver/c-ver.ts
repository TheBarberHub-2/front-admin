import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-c-ver',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './c-ver.html',
  styleUrl: './c-ver.scss',
})
export class CVer implements OnInit {
  tipo: 'peluqueria' | 'categoria' | 'usuario' | null = null;
  id: number | null = null;

  data: any = null;

  constructor(
    private route: ActivatedRoute,
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
      } else if this.tipo === 'categoria' &&
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
      this.data = usuarios.find((u) => u.id == id);
    });
  }*/

  /*loadPeluqueria(id: string) {
        this.peluqueriasService.getPeluquerias().subscribe(peluquerias => {
            this.data = peluquerias.find(p => p.id == id || p.usuario_id == id);
        });
    }*/

  /*loadCategoria(id: string) {
    this.categoriasService.getCategorias().subscribe((categorias) => {
      this.data = categorias.find((c) => c.id == id);
    });
  }*/
}
