import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-c-mod',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './c-mod.html',
  styleUrl: './c-mod.scss',
})
export class CMod implements OnInit {
  tipo: 'peluqueria' | 'categoria' | null = null;
  id: string | null = null;
  peluqueriaForm!: FormGroup;
  categoriaForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private peluqueriasService: PeluqueriasService,
    private categoriasService: CategoriasService
  ) {
    this.initForms();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
      this.id = params['id'];

      if (this.tipo === 'peluqueria' && this.id) {
        this.loadPeluqueria(this.id);
      } else if (this.tipo === 'categoria' && this.id) {
        this.loadCategoria(this.id);
      }
    });
  }

  initForms() {
    this.peluqueriaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required],
      descripcion: ['']
    });

    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  loadPeluqueria(id: string) {
    this.peluqueriasService.getPeluquerias().subscribe(peluquerias => {
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
    });
  }

  loadCategoria(id: string) {
    this.categoriasService.getCategorias().subscribe(categorias => {
      const categoria = categorias.find(c => c.id == id);
      if (categoria) {
        this.categoriaForm.patchValue({
          nombre: categoria.nombre,
          descripcion: categoria.descripcion || ''
        });
      }
    });
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
}
