import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PeluqueriasService } from '../../../services/peluquerias.service';

@Component({
  selector: 'app-peluquerias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './peluquerias.html',
  styleUrl: './peluquerias.scss',
})
export class Peluquerias implements OnInit {
  peluquerias: any[] = [];

  constructor(private peluqueriasService: PeluqueriasService) {}

  ngOnInit() {
    this.peluqueriasService.getPeluquerias().subscribe((data) => {
      this.peluquerias = data.data;
    });
  }
}
