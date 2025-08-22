import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Notas {
   private apiUrl: string = "http://localhost:3000/api"
   token = sessionStorage.getItem('token')
  constructor(private http:HttpClient){}



  getNote(){
    return this.http.get(`${this.apiUrl}/notas`)
  }

  createNota(body: any) {
    let headers = new HttpHeaders({
    'authorization': `Bearer ${this.token}`
  })
    return this.http.post(`${this.apiUrl}/createNote`, body, {headers})
  }

  editNota(body:any, id:string) {
    return this.http.put(`${this.apiUrl}/updateNotes/${id}`, body)
  }

  deleteNota(id:string) {
    return this.http.delete(`${this.apiUrl}/deleteNote/${id}`)
  }

  getOneNote(id:string) {
    return this.http.get(`${this.apiUrl}/nota/${id}`)
  }
}
