import { Component } from '@angular/core';
import { Notas } from '../../../services/notas/notas';
import Swal from 'sweetalert2';
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


    constructor(private serviceNotas: Notas, private router: Router) { }

    ngOnInit() {
        let logued = sessionStorage.getItem('token')
        if (!logued) {
            this.router.navigate(['/login'])
        }
        this.renderNotas()


    }


    renderNotas() {
        this.serviceNotas.getNote().subscribe({
            next: (notas: any) => {
                this.items = notas


            },
            error: (error: any) => {
                console.log(error);

            }
        })
    }


    deletNota(id:string) {
               Swal.fire({
            title: "Are you sure?",
            text: "No podras recuperar esta nota!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.serviceNotas.deleteNota(id).subscribe({
                    next:()=> {
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your note has been deleted.",
                        icon: "success"
                        });
                    this.renderNotas()
                    },
                    error:(error:any)=>{
                        Swal.fire({
                        title: "Error!",
                        text: "No se borro tu nota.",
                        icon: "error"
                        });
                    }
                })
            }
            });
    }




    recuperarNota(id:string) {
        Swal.fire({
            title: "Are you sure?",
            text: "Recuperaras esta nota!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, recicle it!"
            }).then((result) => {
            if (result.isConfirmed) {
                this.serviceNotas.updateNota(id).subscribe({
                    next:()=> {
                        Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                        });
                    this.renderNotas()
                    },
                    error:(error:any)=>{
                        Swal.fire({
                        title: "Error!",
                        text: "No se recupero tu nota.",
                        icon: "error"
                        });
                    }
                })
            }
            });
    }

}
