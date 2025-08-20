import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../../services/user/user';

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

    constructor (private fb: FormBuilder) {
        this.formLogin = fb.group({
            email: ["", [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(4)]]
        })
    }

    login () {
        this.userService.login(this.formLogin.value).subscribe({
            next:()=> {

            },
            error:(error:any)=> {

            }
        })
    }
}
