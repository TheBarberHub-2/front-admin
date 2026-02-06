import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SolicitudesService } from '../../../../services/solicitudes.service';
import { SolicitudPeluqueria } from '../../../../models/solicitudes/solicitud-peluqueria';
import { SolicitudProducto } from '../../../../models/solicitudes/solicitud-producto';
import { Solicitud } from '../../../../models/solicitudes/solicitud';

@Component({
    selector: 'app-c-ver-solicitud',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './c-ver-solicitud.html',
    styleUrl: './c-ver-solicitud.scss',
})
export class CVerSolicitud implements OnInit {
    solicitud: any = null;
    loading: boolean = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private solicitudesService: SolicitudesService
    ) { }

    ngOnInit() {
        this.route.queryParams.subscribe((params: any) => {
            const id = params['id'];
            if (id) {
                this.cargarDetalle(Number(id));
            } else {
                this.error = 'No se ha proporcionado un ID de solicitud.';
                this.loading = false;
            }
        });
    }

    cargarDetalle(id: number) {
        this.loading = true;
        this.solicitudesService.getSolicitudById(id).subscribe({
            next: (data: Solicitud) => {
                this.solicitud = data;
                this.loading = false;
            },
            error: (err: any) => {
                console.error('Error loading solicitud detail:', err);
                this.error = 'Error al cargar los detalles de la solicitud.';
                this.loading = false;
            }
        });
    }

    aprobar() {
        if (confirm('¿Estás seguro de que deseas aprobar esta solicitud?')) {
            this.solicitudesService.aprobarSolicitud(this.solicitud.id).subscribe({
                next: () => {
                    alert('Solicitud aprobada correctamente.');
                    this.router.navigate(['/solicitudes']);
                },
                error: (err: any) => {
                    console.error('Error approving solicitud:', err);
                    alert('Hubo un error al aprobar la solicitud.');
                }
            });
        }
    }

    rechazar() {
        if (confirm('¿Estás seguro de que deseas rechazar esta solicitud?')) {
            this.solicitudesService.rechazarSolicitud(this.solicitud.id).subscribe({
                next: () => {
                    alert('Solicitud rechazada correctamente.');
                    this.router.navigate(['/solicitudes']);
                },
                error: (err: any) => {
                    console.error('Error rejecting solicitud:', err);
                    alert('Hubo un error al rechazar la solicitud.');
                }
            });
        }
    }

    asPeluqueria(): SolicitudPeluqueria {
        return this.solicitud as SolicitudPeluqueria;
    }

    asProducto(): SolicitudProducto {
        return this.solicitud as SolicitudProducto;
    }
}
