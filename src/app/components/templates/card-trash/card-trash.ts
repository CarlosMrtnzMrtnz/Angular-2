import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Notas } from '../../../services/notas/notas';
import { Router } from '@angular/router';


@Component({
  selector: 'app-card-trash',
  imports: [],
  templateUrl: './card-trash.html',
  styleUrl: './card-trash.css',
  standalone: true
})
export class CardTrash {
items: any[] = [];

  constructor(private serviceNotas: Notas, private router : Router) {}

  ngOnInit() {

    if (!sessionStorage.getItem('token')) {
    this.router.navigate(['/login'])
    }

    console.log('Dashboard iniciado');
    this.serviceNotas.getNote().subscribe({
      next: (dataApi: any) => {
        console.log('Datos recibidos:', dataApi);
        this.items = dataApi;

      },
      error: (error: any) => {
        console.error('Error cargando notas:', error);
      }
    });
  }



}
