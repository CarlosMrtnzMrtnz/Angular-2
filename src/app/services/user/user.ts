import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrl } from '../../environments/api-url';

@Injectable({
  providedIn: 'root'
})
export class User {
    private apiUrl:String = ApiUrl.url

    constructor(private http : HttpClient){}



    register (body: any) {
        return this.http.post(`${this.apiUrl}/user`, body)
    }

    login (body:any) {
        return this.http.post(`${this.apiUrl}/login`, body)
    }

}
