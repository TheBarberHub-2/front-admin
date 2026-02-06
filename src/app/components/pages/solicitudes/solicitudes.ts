import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { Solicitud } from '../../../models/solicitudes/solicitud';
import { SearchComponent } from '../../ui/search/search';

@Component({
    selector: 'app-solicitudes',
    standalone: true,
    imports: [CommonModule, SearchComponent],
    templateUrl: './solicitudes.html',
    styleUrl: './solicitudes.scss',
})
export class Solicitudes implements OnInit {
    solicitudes: Solicitud[] = [];
    todasSolicitudes: Solicitud[] = [];
    loading: boolean = true;

    constructor(private solicitudesService: SolicitudesService) { }

    ngOnInit() {
        this.cargarSolicitudes();
    }

    cargarSolicitudes() {
        this.loading = true;
        this.solicitudesService.getSolicitudesPendientes().subscribe({
            next: (data: Solicitud[]) => {
                this.solicitudes = data;
                this.todasSolicitudes = data;
                this.loading = false;
            },
            error: (err: any) => {
                console.error('Error loading solicitudes:', err);
                this.loading = false;
            }
        });
    }

    aprobar(id: number) {
        if (confirm('¿Estás seguro de que deseas aprobar esta solicitud?')) {
            this.solicitudesService.aprobarSolicitud(id).subscribe({
                next: () => {
                    this.cargarSolicitudes();
                    alert('Solicitud aprobada correctamente.');
                },
                error: (err) => console.error('Error approving solicitud:', err)
            });
        }
    }

    rechazar(id: number) {
        if (confirm('¿Estás seguro de que deseas rechazar esta solicitud?')) {
            this.solicitudesService.rechazarSolicitud(id).subscribe({
                next: () => {
                    this.cargarSolicitudes();
                    alert('Solicitud rechazada correctamente.');
                },
                error: (err) => console.error('Error rejecting solicitud:', err)
            });
        }
    }

    onSearch(term: string) {
        if (!term) {
            this.solicitudes = this.todasSolicitudes;
        } else {
            const lowerTerm = term.toLowerCase();
            this.solicitudes = this.todasSolicitudes.filter(s =>
                s.usuario.nombre.toLowerCase().includes(lowerTerm) ||
                s.tipo.toLowerCase().includes(lowerTerm) ||
                s.id.toString().includes(lowerTerm)
            );
        }
    }
}
