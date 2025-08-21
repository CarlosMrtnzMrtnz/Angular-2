import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/home/navbar/navbar';
import { Footer } from './components/home/footer/footer';
import { Sidebar } from './components/home/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'Angular_2025_2';

  get loguiado():boolean {
    let getToken = sessionStorage.getItem('token')

    if (getToken == null) {
        return false
    }

    return true

  }
}
