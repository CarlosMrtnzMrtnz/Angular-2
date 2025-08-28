import { Component, inject } from '@angular/core';
import { CardNotas } from '../../templates/card-notas/card-notas';
import { Notas } from '../../../services/notas/notas';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import flashy from '@pablotheblink/flashyjs';

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
    formNotas!: FormGroup
    imagenFile!: File;
    idNota!: string


    noteServices = inject(Notas)

    constructor(private router : Router, private fb : FormBuilder) {
        this.formNotas = fb.group({
            titulo:["",[Validators.required]],
            descripcion:["",[Validators.required]],
            userId:[sessionStorage.getItem('user'), [Validators.required]],
            imagen:[null]
        })
    }

    ngOnInit() {

        if (!sessionStorage.getItem('token')) {
            this.router.navigate(['/login'])
        }

        this.render()

    }

    cargarImagen(event: any) {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files.length > 0) {
    this.imagenFile = input.files[0];
    console.log(">>>Imagen FILE", this.imagenFile);

    // opcional: reflejar en el form
    this.formNotas.patchValue({ imagen: this.imagenFile });
  } else {
    console.warn("No se seleccionó ningún archivo");
  }
}

addNota() {
  if (this.formNotas.valid) {
    // 👇 Aquí convertimos el form en FormData
    const formData = new FormData();
    formData.append("titulo", this.formNotas.get('titulo')?.value);
    formData.append("descripcion", this.formNotas.get('descripcion')?.value);
    formData.append("userId", this.formNotas.get('userId')?.value);

    if (this.imagenFile) {
      formData.append("imagen", this.imagenFile); // el archivo real
    }

    this.noteServices.createNota(formData).subscribe({
      next: (dataApi: any) => {
        this.render();
        this.formNotas.reset();
        flashy('¡Tu nota ha sido creada!', {
          type: 'success',
          position: 'top-right',
          duration: 4000,
          closable: true,
          animation: 'slide',
          theme: 'light'
        });
      },
      error: (error: any) => {
        console.log(error);
        flashy.error('Algo salió mal');
      }
    });
  } else {
    flashy.warning('Formulario inválido!', {
      position: 'top-center',
      animation: 'bounce',
      theme: 'dark'
    });
  }
}


    render() {
        this.noteServices.getNote().subscribe({
            next:(notas:any)=>{
                this.dataNotas = notas
            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    editarNota(id:string){
        this.noteServices.getOneNote(id).subscribe({
            next:(dataApi:any)=>{
                this.formNotas.patchValue({
                    titulo:dataApi.titulo,
                    descripcion:dataApi.descripcion
                })
                this.idNota= id
            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }

    ahoraSiEditar() {
        this.noteServices.editNota(this.formNotas.value, this.idNota).subscribe({
            next:(dataApi)=> {

                this.render()
                this.idNota =""
            },
            error:(error:any)=> {
                console.log(error);
            }
        })
    }
}
