import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
import { ProductosService } from '../../../services/productos.service';
@Component({
  selector: 'app-c-mod',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './c-mod.html',
  styleUrl: './c-mod.scss',
})
export class CMod implements OnInit {
  tipo: 'peluqueria' | 'categoria' | 'usuario' | 'producto' | null = null;
  id: number | null = null;
  peluqueriaForm!: FormGroup;
  categoriaForm!: FormGroup;
  usuarioForm!: FormGroup;
  productoForm!: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuariosService: UsuariosService,
    private productosService: ProductosService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.tipo = params['tipo'];
      this.id = params['id'];

      if (this.tipo === 'peluqueria' && this.id) {
        this.loadPeluqueria(String(this.id));
      } else if (this.tipo === 'categoria' && this.id) {
        this.loadCategoria(String(this.id));
      } else if (this.tipo === 'usuario' && this.id) {
        this.loadUsuario(Number(this.id));
      } else if (this.tipo === 'producto' && this.id) {
        this.loadProducto(String(this.id));
      }
    });
  }

  loadUsuario(id: number) {
    console.log('Cargando usuario con ID:', id);

    this.usuarioForm = this.fb.group({
      nombre: [''],
      email: [''],
    });

    this.usuariosService.verUsuario(id).subscribe({
      next: (usuario) => {
        console.log('Usuario obtenido:', usuario);
        if (usuario) {
          this.usuarioForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
          });
          console.log('Formulario actualizado con:', this.usuarioForm.value);
        }
      },
      error: (err) => console.error('Error cargando usuario:', err)
    });
  }

  loadPeluqueria(id: string) {
    this.peluqueriaForm = this.fb.group({
      nombre: [''],
      email: [''],
      telefono: [''],
      direccion: [''],
      ciudad: [''],
      descripcion: [''],
    });

    this.peluqueriasService.verPeluqueria(Number(id)).subscribe({
      next: (peluqueria) => {
        console.log('Peluquería obtenida:', peluqueria);
        if (peluqueria) {
          this.peluqueriaForm.patchValue({
            nombre: peluqueria.nombre,
            email: peluqueria.email,
            telefono: peluqueria.telefono,
            direccion: peluqueria.direccion,
            ciudad: peluqueria.ciudad || peluqueria.municipio,
            descripcion: peluqueria.descripcion || ''
          });
        }
      },
      error: (err) => console.error('Error cargando peluquería:', err)
    });
  }

  loadCategoria(id: string) {
    this.categoriaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });

    this.categoriasService.verCategoria(Number(id)).subscribe({
      next: (categoria) => {
        console.log('Categoría obtenida:', categoria);
        if (categoria) {
          this.categoriaForm.patchValue({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion || '',
          });
        }
      },
      error: (err) => console.error('Error cargando categoría:', err)
    });
  }

  loadProducto(id: string) {
    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      stock: [''],
      categoria_id: [''],
    });

    this.productosService.verProducto(Number(id)).subscribe({
      next: (producto) => {
        console.log('Producto obtenido:', producto);
        if (producto) {
          this.productoForm.patchValue({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            categoria_id: producto.categoria_id,
          });
        }
      },
      error: (err) => console.error('Error cargando producto:', err)
    });
  }

  onSubmitPeluqueria() {
    if (this.peluqueriaForm.valid) {
      console.log('Peluquería modificada:', this.peluqueriaForm.value);
      this.peluqueriasService.modificarPeluqueria(this.id!, this.peluqueriaForm.value).subscribe({
        next: (peluqueria) => {
          console.log('Peluquería modificada:', peluqueria);
        },
        error: (err) => console.error('Error modificando peluquería:', err)
      });
    }
  }

  onSubmitCategoria() {
    if (this.categoriaForm.valid) {
      console.log('Categoría modificada:', this.categoriaForm.value);
      this.categoriasService.modificarCategoria(this.id!, this.categoriaForm.value).subscribe({
        next: (categoria) => {
          console.log('Categoría modificada:', categoria);
        },
        error: (err) => console.error('Error modificando categoría:', err)
      });
    }
  }

  onSubmitUsuario() {
    if (this.usuarioForm.valid) {
      console.log('Usuario modificado:', this.usuarioForm.value);
      this.usuariosService.modificarUsuario(this.id!, this.usuarioForm.value).subscribe({
        next: (usuario) => {
          console.log('Usuario modificado:', usuario);
        },
        error: (err) => console.error('Error modificando usuario:', err)
      });
    }
  }
}
