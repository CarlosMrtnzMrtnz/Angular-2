import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../services/user/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

    userService = inject(User)
    constructor(private router: Router) {}

    logueado: boolean = false

    @Output() loged = new EventEmitter()

    ngOnInit() {
        this.userService.isLogged.subscribe({
            next:(data:any)=> {
                this.logueado = data
            },
            error:(error:any)=> {
                console.log(error);

            }
        })
    }



    logout() {
        Swal.fire({
            title: "Are you sure?",
            text: "You will be logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, logout!"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "Logout!",
            text: "You has been Logout!",
            icon: "success"
            });
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('user')
                this.router.navigate(['/login'])
                this.userService.out()
                this.loged.emit()
        }
        });


    }

}
