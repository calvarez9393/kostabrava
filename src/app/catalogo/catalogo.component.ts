import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GaleriaComponent, Image } from '../galeria/galeria.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Catalogo {
  titulo: string;
  categorias: Categoria[];
}

export interface Categoria {
  clasificacion: string;
  url: string;
  hijos?: Image[];
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
  standalone: false,
})
export class CatalogoComponent implements OnInit {

  catalogo?: Catalogo
  categorias: string[] = []
  copia_categorias: Categoria[] = [];

  catalogo_masculino: Catalogo = {
    titulo: 'Ejecutivo Masculino',
    categorias: [
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/3-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/3-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/15-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/15-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/16-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/16-01-1-scaled.jpg' },
        { url: 'assets/catalogo/17-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/19-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/19-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/4-04-04-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/4-04-04-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/6-06-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/6-06-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/8-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/8-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/10-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/10-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/11-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/11-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/14-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/14-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/28-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/28-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/29-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/29-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/30-01-2-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/30-01-2-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/34-01-2-scaled',
        hijos: [{ url: 'assets/catalogo/34-01-2-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/35-01-2-scaled',
        hijos: [{ url: 'assets/catalogo/35-01-2-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/39-01-2-scaled',
        hijos: [{ url: 'assets/catalogo/39-01-2-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/40-01-2-scaled',
        hijos: [{ url: 'assets/catalogo/40-01-2-scaled.jpg' }]
      },
    ]
  }
  catalogo_femenino: Catalogo = {
    titulo: 'Ejecutivo Femenino',
    categorias: [
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/1-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/1-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/5-05-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/5-05-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/13-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/13-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/22-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/22-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/23-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/23-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Corta', url: 'assets/catalogo/52-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/52-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/9-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/9-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/18-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/18-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/20-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/20-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/24-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/24-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/26-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/26-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/27-01-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/27-01-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/31-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/31-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/33-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/33-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/36-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/36-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/41-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/41-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga Larga', url: 'assets/catalogo/42-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/42-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga 3/4', url: 'assets/catalogo/21-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/21-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Manga 3/4', url: 'assets/catalogo/25-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/25-01-1-scaled.jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/39-01-2-scaled (1).jpg',
        hijos: [{ url: 'assets/catalogo/39-01-2-scaled (1).jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/34-01-2-scaled (1).jpg',
        hijos: [{ url: 'assets/catalogo/34-01-2-scaled (1).jpg' }]
      },
      {
        clasificacion: 'Formal', url: 'assets/catalogo/38-01-1-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/38-01-1-scaled.jpg' }]
      },
    ]
  }

  catalogo_operativo: Catalogo = {
    titulo: 'Operativo',
    categorias: [
      {
        clasificacion: 'Camiseta', url: 'assets/catalogo/47-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/47-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Camiseta', url: 'assets/catalogo/50-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/50-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Camisa', url: 'assets/catalogo/54-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/54-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Chaleco', url: 'assets/catalogo/56-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/56-01-scaled.jpg' }]
      },
      {
        clasificacion: 'Chaleco', url: 'assets/catalogo/55-01-scaled.jpg',
        hijos: [{ url: 'assets/catalogo/55-01-scaled.jpg' }]
      },
    ]
  }

  catalogo_calzado: Catalogo = {
    titulo: 'Calzado',
    categorias: [
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c1.jpg',
        hijos: [{ url: 'assets/catalogo/c1.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c2.jpg',
        hijos: [{ url: 'assets/catalogo/c2.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c3.jpg',
        hijos: [{ url: 'assets/catalogo/c3.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c4.jpg',
        hijos: [{ url: 'assets/catalogo/c4.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c5.jpg',
        hijos: [{ url: 'assets/catalogo/c5.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c6.jpg',
        hijos: [{ url: 'assets/catalogo/c6.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c7.jpg',
        hijos: [{ url: 'assets/catalogo/c7.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c8.jpg',
        hijos: [{ url: 'assets/catalogo/c8.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c9.jpg',
        hijos: [{ url: 'assets/catalogo/c9.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c10.jpg',
        hijos: [{ url: 'assets/catalogo/c10.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c11.jpg',
        hijos: [{ url: 'assets/catalogo/c11.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c12.jpg',
        hijos: [{ url: 'assets/catalogo/c12.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c13.jpg',
        hijos: [{ url: 'assets/catalogo/c13.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c14.jpg',
        hijos: [{ url: 'assets/catalogo/c14.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c15.jpg',
        hijos: [{ url: 'assets/catalogo/c15.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c16.jpg',
        hijos: [{ url: 'assets/catalogo/c16.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c17.jpg',
        hijos: [{ url: 'assets/catalogo/c17.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c18.jpg',
        hijos: [{ url: 'assets/catalogo/c18.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c19.jpg',
        hijos: [{ url: 'assets/catalogo/c19.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c20.jpg',
        hijos: [{ url: 'assets/catalogo/c20.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c21.jpg',
        hijos: [{ url: 'assets/catalogo/c21.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c22.jpg',
        hijos: [{ url: 'assets/catalogo/c22.jpg' }]
      },
      {
        clasificacion: 'Mujer', url: 'assets/catalogo/c23.jpg',
        hijos: [{ url: 'assets/catalogo/c23.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-15.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-15.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-16.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-16.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-14.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-14.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-13.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-13.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-12.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-12.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-11.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-11.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-10.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-10.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-09.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-09.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-08.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-08.jpg' }]
      },
      {
        clasificacion: 'Hombre', url: 'assets/catalogo/zapatos-KB-07.jpg',
        hijos: [{ url: 'assets/catalogo/zapatos-KB-07.jpg' }]
      },



    ]
  }


  constructor(
    private activateRouter: ActivatedRoute, 
    private router: Router,
    private modal: NgbModal,
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('catalogo')) return;
    this.activateRouter.params.subscribe(
      ({ id }) => {
        if (id === "masculino") { this.catalogo = this.catalogo_masculino }
        else if (id === "femenino") { this.catalogo = this.catalogo_femenino }
        else if (id === "operativo") { this.catalogo = this.catalogo_operativo }
        else if (id === "calzado") { this.catalogo = this.catalogo_calzado }
        else this.catalogo = this.catalogo_masculino;
        this.categorias = Array.from(new Set(this.catalogo.categorias.map(categoria => categoria.clasificacion)));
      })
  }

  filtrar(texto: string) {
    if (this.copia_categorias.length > 0) {
      this.catalogo!.categorias = this.copia_categorias
    } else {
      this.copia_categorias = this.catalogo!.categorias
    }
    if (texto === 'todo') {
    } else {
      this.catalogo!.categorias = this.catalogo!.categorias.filter(categoria => categoria.clasificacion == texto)
    }
  }

  abrir_imagenes(lista: Image[]): void {
    const modalRef = this.modal.open(GaleriaComponent, {
      size: 'xl',
      windowClass: 'kb-gallery-window',
      backdropClass: 'kb-gallery-backdrop',
      centered: true
    });
    modalRef.componentInstance.imagenes = lista;
  }


}



