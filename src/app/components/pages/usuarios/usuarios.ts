import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './usuarios.html',
    styleUrl: './usuarios.scss',
})
export class Usuarios implements OnInit {
    usuarios: any[] = [];

    constructor(private usuariosService: UsuariosService) { }

    ngOnInit() {
        this.usuariosService.getUsuarios().subscribe(data => {
            this.usuarios = data;
        });
    }
}
