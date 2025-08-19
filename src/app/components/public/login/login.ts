import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/user/user';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

    constructor(private fb: FormBuilder, private router:Router){
        this.formLogin = fb.group({
            email: ["", [Validators.required]],
            password: ["", [Validators.required]]
        })
    }

    ngOnInit() {
        let token = sessionStorage.getItem('token')
        if (token) {
            this.router.navigate(['/dashboard'])
        }
    }

    login() {
        let form = this.formLogin.valid

        if (form) {
            this.userService.login(this.formLogin.value).subscribe({
                next:(dataApi: any)=> {
                    console.log(dataApi);

                    Swal.fire({
                        title:"Has iniciado session!",
                        icon:"success",
                        draggable:true
                    })

                    sessionStorage.setItem("token", dataApi.token)
                    sessionStorage.setItem("user",JSON.stringify(dataApi.payload) )
                    this.userService.in()
                    // this.router.navigate(['/dashboard'])
                },
                error:(error:any)=> {
                    console.log(error);
                    Swal.fire({
                        title:"Ingresa info valida!",
                        icon:"warning",
                        draggable:true
                    })

                }
            })
        }
    }
}
