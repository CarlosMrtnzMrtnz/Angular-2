import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/user/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
    userService = inject(User)

    formUser!: FormGroup

    constructor(private fb: FormBuilder, private router: Router) {
        this.formUser = fb.group({
            userName:["",[Validators.required,Validators.minLength(3)]],
            email:["",[Validators.required, Validators.email]],
            password:["",[Validators.required,Validators.minLength(4)]]
        })
    }

    ngOnInit () {
        if (sessionStorage.getItem('token')) {
            this.router.navigate(['/dashboard'])
        }
    }

    registrarse () {

        if (this.formUser.valid) {
            this.userService.register(this.formUser.value).subscribe({
                next:(dataApi:any)=>{
                    console.log(dataApi);
                    Swal.fire({
                    title: "Registrado!",
                    icon: "success",
                    draggable: true
                    });
                    // sessionStorage.setItem('token', dataApi)
                    setInterval(() => {
                        this.router.navigate(['/login'])

                    }, 2000);
                },
                error:(error:any)=>{
                    console.log(error);
                    Swal.fire({
                        title:"Error!",
                        icon:"warning",
                        draggable:true
                    })
                }
            })
        } else [
            Swal.fire({
                title:"Error!",
                icon:"warning",
                text:"Formulario invalido!",
                draggable:true
            })
        ]



    }

}
