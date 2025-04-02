import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Item {
  url: string;
  title: string;
}

export interface Empleado {
  nombre: string;
  telefono: string;
  correo: string;
  url: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  empleados: Empleado[] = [
    {
      nombre: 'Luis Fernando Ladino',
      telefono: '3168968248',
      correo: 'luisfernando.ladino@kostazul.com',
      url: 'assets/asesores/FERNANDO-LADINO-01-01-2048x2048.jpg'
    },
    {
      nombre: 'Eliana Osorio Galvis',
      telefono: '3116423969',
      correo: 'corporativos2@kostazul.com',
      url: 'assets/asesores/ELIANA-01-1-2048x2048.jpg'
    },
    {
      nombre: 'Nathalia Montes Munera',
      telefono: '3234929241',
      correo: 'dirnegocioscorporativos@kostazul.com',
      url: 'assets/asesores/NATHALIA-01-2048x2048.jpg'
    },
    {
      nombre: 'Hector Hernan Correa Correa',
      telefono: '3155323413',
      correo: 'corporativos@kostazul.com',
      url: 'assets/asesores/HECTOR-01-2048x2048.jpg'
    },
    {
      nombre: 'Jonathan Alejandro Henao Montoya',
      telefono: '3148752382',
      correo: 'analistadelicitaciones@kostazul.com',
      url: 'assets/asesores/ALEJANDRO-01-1-2048x2048.jpg'
    },
    {
      nombre: 'Asdrubal Manso Carrillo',
      telefono: '3116423969',
      correo: 'analista.nc@kostazul.com',
      url: 'assets/asesores/HM2A7985.jpg'
    },
    {
      nombre: 'Paola Andrea Manzano',
      telefono: '3116423969',
      correo: 'corporativos3@kostazul.com',
      url: 'assets/asesores/HM2A7968.jpg'
    }
  ];

  items: Item[] = [
    { url: 'assets/logos/frisby-1.png', title: 'frisby' },
    { url: 'assets/logos/comfamiliar-1.png', title: 'comfamiliar' },
    { url: 'assets/logos/dmario-1.png', title: 'dmario' },
    { url: 'assets/logos/epm-1.png', title: 'epm' },
    { url: 'assets/logos/giros.png', title: 'giros' },
    { url: 'assets/logos/terminal.png', title: 'terminal' }
  ]

  responsiveOptions: any[] | undefined;
  tiempo: string = "2000";

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '800px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '600px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

}

