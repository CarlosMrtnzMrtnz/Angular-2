import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Notas {
   private apiUrl: string = "http://localhost:3000/api"
  constructor(private http:HttpClient){}

  getNote() {
    return this.http.get(`${this.apiUrl}/notas`)
  }

  createNota(data:any) {
    return this.http.post(`${this.apiUrl}/createNote`, data)
  }

  updateNota(id:string) {
    return this.http.put(`${this.apiUrl}/updateNote/${id}`,{})
  }

  deleteNota(id:string) {
    return this.http.delete(`${this.apiUrl}/deleteNote/${id}`)
  }

  getOneNote(id:string) {
    return this.http.get(`${this.apiUrl}/nota/${id}`)
  }

  updateNotas (id:string, data: any) {
    return this.http.put(`${this.apiUrl}/updateNotes/${id}`, data)
  }

}
