import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/user/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    userService = inject(User)


    formLogin!: FormGroup

    constructor (private fb: FormBuilder, private router : Router) {
        this.formLogin = fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(4)]]
        })
    }

    ngOnInit () {
        if (sessionStorage.getItem('token')) {
            this.router.navigate(['/dashboard'])
        }
    }

    login () {
        if (this.formLogin.valid) {
            this.userService.login(this.formLogin.value).subscribe({
                next:(dataApi: any)=> {
                    sessionStorage.setItem('token', dataApi.token)
                    sessionStorage.setItem('user', dataApi.payload.id)
                    Swal.fire({
                        title:"Bienvenido",
                        icon:"success",
                        draggable: true
                })
                },
                error:(error:any)=> {
                    console.log(error);

                    Swal.fire({
                        title:"Ups! algo salio mal intenta de nuevo",
                        icon:"warning",
                        draggable: true,
                        text:`${error.error.error}`
                })
                }
            })

        } else {
            Swal.fire({
                title:"Formulario invalido",
                icon:"warning",
                draggable: true,
                text: "Diligencia los campos correctamente!"
            })
            console.log(this.formLogin.value);

        }

    }
}
