import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeluqueriasService } from '../../../services/peluquerias.service';
import { CategoriasService } from '../../../services/categorias.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-c-crear',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './c-crear.html',
  styleUrl: './c-crear.scss',
})
export class CCrear implements OnInit {
  tipo: 'peluqueria' | 'categoria' | null = null;
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
    // Solo obtenemos el tipo de formulario a mostrar
    this.route.queryParams.subscribe(params => {
      this.tipo = params['tipo'];
    });
  }

  initForms() {
    // Formulario vacío para crear nueva peluquería
    this.peluqueriaForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      ciudad: ['', Validators.required]
    });

    // Formulario vacío para crear nueva categoría
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['']
    });
  }

  onSubmitPeluqueria() {
    if (this.peluqueriaForm.valid) {
      console.log('Nueva peluquería a crear:', this.peluqueriaForm.value);
      // TODO: Implementar petición POST para crear peluquería
      // this.peluqueriasService.createPeluqueria(this.peluqueriaForm.value).subscribe(...)
    }
  }

  onSubmitCategoria() {
    if (this.categoriaForm.valid) {
      console.log('Nueva categoría a crear:', this.categoriaForm.value);
      // TODO: Implementar petición POST para crear categoría
      // this.categoriasService.createCategoria(this.categoriaForm.value).subscribe(...)
    }
  }
}
