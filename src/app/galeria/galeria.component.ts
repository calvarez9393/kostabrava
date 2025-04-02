import { Component, Input, OnInit } from '@angular/core';
export interface Image{
  url: string,
  titulo?: string,
  alt?: string,

}


@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent{
  
  //imagenes: Image[] = [
  //  { url :  'assets/catalogo/2/1.jpg', alt : 'imagen 1', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/1-1.jpg', alt : 'imagen 1-1', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/2.jpg', alt : 'imagen 2', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/12-01-1.jpg', alt : 'imagen 12-01-1', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/13-01.jpg', alt : 'imagen 13-01', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/41-01.jpg', alt : 'imagen 41-01', titulo : 'imagen muestra'},
  //  { url :  'assets/catalogo/2/42-01.jpg', alt : 'imagen 42-01', titulo : 'imagen muestra'},
  //];

  @Input()
  imagenes!: Image[];

  responsiveOptions = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];


  

}
