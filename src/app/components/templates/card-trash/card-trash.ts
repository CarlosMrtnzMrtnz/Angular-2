import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Notas } from '../../../services/notas/notas';


@Component({
  selector: 'app-card-trash',
  imports: [],
  templateUrl: './card-trash.html',
  styleUrl: './card-trash.css',
  standalone: true
})
export class CardTrash {
items: any[] = [];

  constructor(private serviceNotas: Notas, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    console.log('Dashboard iniciado');
    this.serviceNotas.getNote().subscribe({
      next: (dataApi: any) => {
        console.log('Datos recibidos:', dataApi);
        this.items = dataApi;
        this.cd.detectChanges(); // 🔹 fuerza actualización inmediata
      },
      error: (error: any) => {
        console.error('Error cargando notas:', error);
      }
    });
  }



}
