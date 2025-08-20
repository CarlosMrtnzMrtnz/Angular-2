import { Component, inject } from '@angular/core';
import { CardNotas } from '../../templates/card-notas/card-notas';
import { Notas } from '../../../services/notas/notas';

@Component({
  selector: 'app-dashboard',
  imports: [CardNotas],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    dataNotas!: any[]


    noteServices = inject(Notas)

    ngOnInit() {
        this.noteServices.getNote().subscribe({
            next:(notas:any)=>{
                this.dataNotas = notas
            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }





}
