import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-notas',
  imports: [],
  templateUrl: './card-notas.html',
  styleUrl: './card-notas.css'
})
export class CardNotas {
    drop: boolean = false

    @Input() titulo!: string
}
