import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';
@Component({
  selector: 'app-c-mod',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './c-mod.html',
  styleUrl: './c-mod.scss',
})
export class CMod implements OnInit {
  tipo: 'peluqueria' | 'categoria' | 'usuario' | null = null;
  id: number | null = null;
  peluqueriaForm!: FormGroup;
  categoriaForm!: FormGroup;
  usuarioForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService,
    private usuariosService: UsuariosService
  ) {}

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
      }
    });
  }

  loadUsuario(id: number) {
    console.log('Cargando usuario con ID:', id);

    this.usuarioForm = this.fb.group({
      nombre: [''],
      email: [''],
    });

    /*this.usuariosService.getUsuarios().subscribe((usuarios) => {
      console.log('Usuarios obtenidos:', usuarios);
      const usuario = usuarios.find((u) => u.id == id);
      console.log('Usuario encontrado:', usuario);

      if (usuario) {
        this.usuarioForm.patchValue({
          nombre: usuario.nombre,
          email: usuario.email,
        });
        console.log('Formulario actualizado con:', this.usuarioForm.value);
      }
    });*/
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

    /*this.peluqueriasService.getPeluquerias().subscribe(peluquerias => {
      const peluqueria = peluquerias.find(p => p.id == id || p.usuario_id == id);
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
    });*/
  }

  loadCategoria(id: string) {
    this.categoriaForm = this.fb.group({
      nombre: [''],
      descripcion: [''],
    });

    /*this.categoriasService.getCategorias().subscribe((categorias) => {
      const categoria = categorias.find((c) => c.id == id);
      if (categoria) {
        this.categoriaForm.patchValue({
          nombre: categoria.nombre,
          descripcion: categoria.descripcion || '',
        });
      }
    });*/
  }

  onSubmitPeluqueria() {
    if (this.peluqueriaForm.valid) {
      console.log('Peluquería modificada:', this.peluqueriaForm.value);
      // Aquí puedes agregar la lógica para actualizar la peluquería
    }
  }

  onSubmitCategoria() {
    if (this.categoriaForm.valid) {
      console.log('Categoría modificada:', this.categoriaForm.value);
      // Aquí puedes agregar la lógica para actualizar la categoría
    }
  }

  onSubmitUsuario() {
    if (this.usuarioForm.valid) {
      console.log('Usuario modificado:', this.usuarioForm.value);
      // Aquí puedes agregar la lógica para actualizar el usuario
    }
  }
}
