import { Component, OnInit } from '@angular/core';

export interface Item {
  url: string;
  title: string;
}

export interface Empleado {
  nombre: string;
  cargo: string;
  telefono: string;
  correo: string;
  url: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
  standalone: false,
})
export class InicioComponent implements OnInit {

  empleados: Empleado[] = [
    {
      nombre: 'Nathalia Montes Munera',
      cargo: 'Directora de Negocios Corporativos',
      telefono: '3234929241',
      correo: 'dirnegocioscorporativos@kostazul.com',
      url: 'assets/asesores/NATHALIA-01-2048x2048.jpg'
    },
    {
      nombre: 'Luis Fernando Ladino',
      cargo: 'Asesor de Ventas',
      telefono: '3168968248',
      correo: 'luisfernando.ladino@kostazul.com',
      url: 'assets/asesores/FERNANDO-LADINO-01-01-2048x2048.jpg'
    },
    {
      nombre: 'Eliana Osorio Galvis',
      cargo: 'Asesor de Ventas',
      telefono: '3116423969',
      correo: 'corporativos2@kostazul.com',
      url: 'assets/asesores/ELIANA-01-1-2048x2048.jpg'
    },
    {
      nombre: 'Hector Hernan Correa Correa',
      cargo: 'Asesor de Ventas',
      telefono: '3155323413',
      correo: 'corporativos@kostazul.com',
      url: 'assets/asesores/HECTOR-01-2048x2048.jpg'
    },
    {
      nombre: 'Jonathan Alejandro Henao Montoya',
      cargo: 'Analista de Licitaciones',
      telefono: '3148752382',
      correo: 'analistadelicitaciones@kostazul.com',
      url: 'assets/asesores/ALEJANDRO-01-1-2048x2048.jpg'
    },
    {
      nombre: 'Rosa Mariannella Rivera Quintero',
      cargo: 'Coordinadora de Negocios Corporativos',
      telefono: '6063419393',
      correo: 'asistente.comercial@kostazul.com',
      url: 'assets/asesores/mariannella.png'
    }
  ];

  items: Item[] = [
    { url: 'assets/logos/frisby-1.png', title: 'Frisby' },
    { url: 'assets/logos/comfamiliar-1.png', title: 'Comfamiliar' },
    { url: 'assets/logos/dmario-1.png', title: 'D\' Mario' },
    { url: 'assets/logos/epm-1.png', title: 'EPM' },
    { url: 'assets/logos/giros.png', title: 'Giros' },
    { url: 'assets/logos/terminal.png', title: 'Terminal' }
  ];

  responsiveOptions: any[] | undefined;

  ngOnInit(): void {
    this.responsiveOptions = [
      { breakpoint: '1399px', numVisible: 3, numScroll: 1 },
      { breakpoint: '991px', numVisible: 2, numScroll: 1 },
      { breakpoint: '576px', numVisible: 1, numScroll: 1 },
    ];
  }
}
