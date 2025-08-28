import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-administrador',
  imports: [],
  templateUrl: './administrador.html',
  styleUrl: './administrador.css'
})
export class Administrador {
cascoForm: FormGroup;
  cascos:any = [];

  constructor(private fb: FormBuilder) {
    this.cascoForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.cascoForm.valid) {
      const newCasco: any= {
        id: this.cascos.length + 1,
        ...this.cascoForm.value
      };
      this.cascos.push(newCasco);
      this.cascoForm.reset();
    }
  }
}
