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

    formRegister!: FormGroup

    constructor(private fb : FormBuilder, private router: Router) {
        this.formRegister = fb.group({
            userName: ["",[Validators.required]],
            email: ["",[Validators.required]],
            password: ["",[Validators.required]]
        })
    }

    ngOnInit() {
        let token = sessionStorage.getItem('token')
        if (token) {
            this.router.navigate(['/dashboard'])
        }

    }

    register() {
        let form = this.formRegister.valid

        if (form) {
            this.userService.createUser(this.formRegister.value).subscribe({
                next:(dataApi:any)=> {
                    console.log(">>>>", this.formRegister.value);

                    Swal.fire({
                        title:'User has registered!',
                        icon:'success',
                        draggable:true
                    })
                    this.formRegister.reset()
                    this.router.navigate(["/login"])
                },
                error:(error:any)=> {
                    console.log(">>>>", this.formRegister.value);
                    console.log(error);

                    Swal.fire({
                        title:'User can´t register!',
                        icon:'error',
                        draggable:true
                    })

                }
            })
        }

    }

}
