import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SendCorreosService } from '../services/send-correos.service';
import { MessageService } from 'primeng/api';

export interface Formulario {
  nombre: string;
  correo: string;
  telefono: string;
  empresa: string;
  mensaje: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
  providers: [MessageService]
})
export class FormularioComponent {

  formulario = this.fb.group({
    nombre: [, [Validators.required],],
    correo: [, [Validators.required, Validators.email],],
    telefono: [, [Validators.required],],
    empresa: [, [Validators.required],],
    mensaje: [, [Validators.required],],
  })

  formularioguardar?: Formulario

  constructor(
    private fb: FormBuilder,
    private service: SendCorreosService,
    private messageService: MessageService
  ) { }


  guardarFormulario(): void {
    const nombre = this.formulario.get('nombre')!.value;
    const correo = this.formulario.get('correo')!.value;
    const telefono = this.formulario.get('telefono')!.value;
    const empresa = this.formulario.get('empresa')!.value;
    const mensaje = this.formulario.get('mensaje')!.value;
    this.formularioguardar = {
      nombre: nombre!, correo: correo!, telefono: telefono!, empresa: empresa!, mensaje: mensaje!

    }
    this.service.sendcorreos(this.formularioguardar).subscribe(() => {
      console.log('Correo enviado');
    })
    this.messageService.add({ severity: 'success', summary: 'Mensaje', detail: 'enviado correctamente' });
    this.formulario.reset()
  }



}
