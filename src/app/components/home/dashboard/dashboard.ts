import { Component, inject } from '@angular/core';
import { CardNotas } from '../../templates/card-notas/card-notas';
import { Notas } from '../../../services/notas/notas';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  imports: [
    CardNotas,
    ReactiveFormsModule
],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
    dataNotas!: any[]
    formNotas!:FormGroup
    idNota!: string

    noteServices = inject(Notas)


    constructor(private router:Router, private fb: FormBuilder) {
        this.formNotas = fb.group({
            titulo:["", [Validators.required]],
            descripcion:["", [Validators.required]],
            userId:[""]
        })
    }


    ngOnInit () {

        let token = sessionStorage.getItem('token')
        if (!token) {
            this.router.navigate(['/login'])
        }

        this.renderNotas()
    }

    createNote () {
        let form = this.formNotas

        if (form.valid) {
            let user:any = sessionStorage.getItem('user')
            user = JSON.parse(user)
            let createNota = this.formNotas.value
            createNota.userId = user.id


            this.noteServices.createNota(createNota).subscribe({
                next:(dataApi:any)=> {
                    this.renderNotas()
                    Swal.fire({
                    title:'Tarea creada!',
                    icon:'success'
                })
                },
                error:(error:any)=> {
                    Swal.fire({
                    title:'No se pudo crear!',
                    icon:'error'
                })
                    console.log(error);

                }
            })
        }

    }

    renderNotas () {
        this.noteServices.getNote().subscribe({
            next:(notas:any)=>{
                this.dataNotas = notas
                console.log(this.dataNotas);

            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }

    updateNota (id:string) {

        Swal.fire({
            title: "Are you sure?",
            text: "Eliminaras la nota!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, eliminar!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Logout!",
            text: "Has eliminado la nota!",
            icon: "success"
            });

            this.noteServices.updateNota(id).subscribe({
                next:(dataApi:any)=> {
                Swal.fire({
                title: "Eliminada!",
                text: "Nota eliminada!",
                icon: "success"
                });
                this.renderNotas()
                },
                error:(error:any)=> {
                console.log(error);
                Swal.fire({
                title: "Error!",
                text: "No se puedo eliminar la nota!",
                icon: "error"
                });
                }
            })
        }
        });

    }

    editNota (id:string) {
        this.noteServices.getOneNote(id).subscribe({
            next:(dataApi:any)=> {
                this.idNota = dataApi._id
                this.formNotas.patchValue({
                    titulo: dataApi.titulo,
                    descripcion: dataApi.descripcion
                })
            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    enviarEditado () {

        Swal.fire({
        title: "Are you sure?",
        text: "Editaras esta nota!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, editar!"
        }).then((result) => {
        if (result.isConfirmed) {
            this.noteServices.updateNotas(this.idNota, this.formNotas.value).subscribe({
                next:()=> {
                Swal.fire({
                title: "Editado!",
                text: "Your note has been editado.",
                icon: "success"
                });
                this.formNotas.reset()
                this.renderNotas()
                },
                error:(error:any)=> {
                    console.log(error);
                Swal.fire({
                title: "Error!",
                text: "Your file has not been editado.",
                icon: "error"
                });
                }
        })

        }
        });






    }

    reset() {
        this.formNotas.reset()
    }
}
