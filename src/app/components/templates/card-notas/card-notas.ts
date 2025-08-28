import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-notas',
  imports: [
    DatePipe
  ],
  templateUrl: './card-notas.html',
  styleUrl: './card-notas.css'
})
export class CardNotas {
    drop: boolean = false

    @Input() titulo!: string
    @Input() descripcion!: string
    @Input() imagen!: string
    @Input() createAt!: string

    @Output() update = new EventEmitter

    enviarEvento () {
        this.update.emit()
    }


}
