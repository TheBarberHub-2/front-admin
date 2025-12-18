import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-c-ver',
    standalone: true,
    imports: [RouterLink, CommonModule],
    templateUrl: './c-ver.html',
    styleUrl: './c-ver.scss',
})
export class CVer implements OnInit {
    tipo: 'peluqueria' | 'categoria' | 'usuario' | 'producto' | null = null;
    id: number | null = null;

    data: any = null;

    constructor(
        private route: ActivatedRoute,
        private peluqueriasService: PeluqueriasService,
        private categoriasService: CategoriasService,
        private usuariosService: UsuariosService,
        private productosService: ProductosService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.tipo = params['tipo'];
            this.id = params['id'];

            if (!this.id) {
                console.error('Falta ID en los parámetros');
                return;
            }

            if (this.tipo === 'peluqueria') {
                this.loadPeluqueria(Number(this.id));
            } else if (this.tipo === 'categoria') {
                this.loadCategoria(Number(this.id));
            } else if (this.tipo === 'usuario') {
                this.loadUsuario(Number(this.id));
            } else if (this.tipo === 'producto') {
                this.loadProducto(Number(this.id));
            }
        });
    }

    loadUsuario(id: number) {
        this.usuariosService.verUsuario(id).subscribe({
            next: (usuario) => this.data = usuario,
            error: (err) => console.error('Error cargando usuario:', err)
        });
    }

    loadPeluqueria(id: number) {
        this.peluqueriasService.verPeluqueria(id).subscribe({
            next: (peluqueria) => this.data = peluqueria,
            error: (err) => console.error('Error cargando peluquería:', err)
        });
    }

    loadCategoria(id: number) {
        this.categoriasService.verCategoria(id).subscribe({
            next: (categoria) => this.data = categoria,
            error: (err) => console.error('Error cargando categoría:', err)
        });
    }

    loadProducto(id: number) {
        this.productosService.verProducto(id).subscribe({
            next: (producto) => this.data = producto,
            error: (err) => console.error('Error cargando producto:', err)
        });
    }
}
