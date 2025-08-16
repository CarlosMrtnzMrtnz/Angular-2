import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Notas {
   private apiUrl: string = "http://localhost:3000/api"
  constructor(private http:HttpClient){}

  getNote(){
    return this.http.get(`${this.apiUrl}/notas`)
  }
}
