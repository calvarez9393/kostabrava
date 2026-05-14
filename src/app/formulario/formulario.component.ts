import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SendCorreosService } from '../services/send-correos.service';

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
  providers: [MessageService],
  standalone: false,
})
export class FormularioComponent {
  private fb = inject(FormBuilder);
  private service = inject(SendCorreosService);
  private messageService = inject(MessageService);

  formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    empresa: ['', [Validators.required]],
    mensaje: ['', [Validators.required]],
  });

  guardarFormulario(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos: Formulario = this.formulario.getRawValue();

    this.service.sendcorreos(datos).subscribe(() => {
      console.log('Correo enviado');
    });

    this.messageService.add({
      severity: 'success',
      summary: 'Mensaje',
      detail: 'enviado correctamente',
    });
    this.formulario.reset();
  }
}

