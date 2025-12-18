import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private productosService: ProductosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.peluqueriaForm = this.fb.group({
      nombre: [{ value: '', disabled: true }],
      email: [{ value: '', disabled: true }],
      telefono: [''],
      direccion: [''],
      ciudad: [''],
      descripcion: [''],
    });

    this.categoriaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });

    this.usuarioForm = this.fb.group({
      nombre: [''],
      email: [''],
    });

    this.productoForm = this.fb.group({
      nombre: [''],
      precio: [''],
      stock: [''],
      categoria_id: [''],
    });

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
    this.usuariosService.verUsuario(id).subscribe({
      next: (usuario) => {
        if (usuario) {
          this.usuarioForm.patchValue({
            nombre: usuario.nombre,
            email: usuario.email,
          });
        }
      },
      error: (err) => console.error('Error cargando usuario:', err),
    });
  }

  loadPeluqueria(id: string) {
    this.peluqueriasService.verPeluqueria(Number(id)).subscribe({
      next: (peluqueria) => {
        if (peluqueria) {
          this.peluqueriaForm.patchValue({
            nombre: peluqueria.nombre,
            email: peluqueria.email,
            telefono: peluqueria.telefono,
            direccion: peluqueria.direccion,
            ciudad: peluqueria.ciudad || peluqueria.municipio,
            descripcion: peluqueria.descripcion || '',
          });
        }
      },
      error: (err) => console.error('Error cargando peluquería:', err),
    });
  }

  loadCategoria(id: string) {
    this.categoriasService.verCategoria(Number(id)).subscribe({
      next: (categoria) => {
        if (categoria) {
          this.categoriaForm.patchValue({
            nombre: categoria.nombre,
            descripcion: categoria.descripcion || '',
          });
        }
      },
      error: (err) => console.error('Error cargando categoría:', err),
    });
  }

  loadProducto(id: string) {
    this.productosService.verProducto(Number(id)).subscribe({
      next: (producto) => {
        if (producto) {
          this.productoForm.patchValue({
            nombre: producto.nombre,
            precio: producto.precio,
            stock: producto.stock,
            categoria_id: producto.categoria_id,
          });
        }
      },
      error: (err) => console.error('Error cargando producto:', err),
    });
  }

  onSubmitPeluqueria() {
    if (this.peluqueriaForm.valid) {
      const peluqueriaData = { ...this.peluqueriaForm.getRawValue() };
      peluqueriaData.municipio = peluqueriaData.ciudad;
      delete peluqueriaData.ciudad;

      this.peluqueriasService.modificarPeluqueria(this.id!, peluqueriaData).subscribe({
        next: () => {
          alert('Peluquería modificada correctamente');
          this.router.navigate(['/peluquerias']);
        },
        error: (err) => {
          console.error('Error al modificar peluquería:', err);
          alert('Error al modificar peluquería');
        }
      });
    }
  }

  onSubmitCategoria() {
    if (this.categoriaForm.valid) {
      this.categoriasService.modificarCategoria(this.id!, this.categoriaForm.value).subscribe();
      alert('Categoría modificada correctamente');
      this.router.navigate(['/categorias']);
    }
  }

  onSubmitUsuario() {
    if (this.usuarioForm.valid) {
      this.usuariosService.modificarUsuario(this.id!, this.usuarioForm.value).subscribe();
      alert('Usuario modificado correctamente');
      this.router.navigate(['/usuarios']);
    }
  }

  onSubmitProducto() {
    this.productosService.modificarProducto(this.id!, this.productoForm.value).subscribe();

    alert('Producto modificado correctamente');
    this.router.navigate(['/productos']);
  }

}
