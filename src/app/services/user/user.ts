import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
    private apiUrl: string = "http://localhost:3000/api"

    private logged = new BehaviorSubject(!!sessionStorage.getItem('token'))

    isLogged:Observable<boolean> = this.logged.asObservable()

    constructor(private http: HttpClient) {}

    in(){
        this.logged.next(true)
    }

    out() {
        this.logged.next(false)
    }

    logout() {
        sessionStorage.removeItem("token")
    }


    createUser (data:any) {
        return this.http.post(`${this.apiUrl}/user`, data)
    }

    login (data: any) {
        return this.http.post(`${this.apiUrl}/login`, data)
    }
}
