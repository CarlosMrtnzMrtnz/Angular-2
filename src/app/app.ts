import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/home/navbar/navbar';
import { Footer } from './components/home/footer/footer';
import { Sidebar } from './components/home/sidebar/sidebar';
import { User } from './services/user/user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Angular_2025_2';

    userService = inject(User)

    logued: boolean = false


    ngOnInit() {
        this.userService.isLogged.subscribe({
            next:(data:any)=> {
                this.logued = data
            },
            error:(error:any)=> {
                console.log(error);

            }
        })

    }

    ngOnChange(){
    }

}
