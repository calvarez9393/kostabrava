import { Component, OnInit } from '@angular/core';
import { aniosDesdeFundacion } from './anios-empresa';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'kostabrava';

  ngOnInit(): void {
    this.actualizarMetaAniosExperiencia();
  }

  /** Actualiza meta description (SEO) con los años calculados desde 16/09/1964. */
  private actualizarMetaAniosExperiencia(): void {
    const anios = aniosDesdeFundacion();
    const descripcion = `Kosta Brava — más de ${anios} años fabricando uniformes y dotaciones corporativas de alta calidad en Colombia. Ejecutivo masculino, femenino, operativo y calzado. Solicita tu cotización.`;
    const ogDescripcion = `Más de ${anios} años fabricando uniformes y dotaciones corporativas de alta calidad en Colombia. Ejecutivo, operativo y calzado corporativo.`;
    const twitterDescripcion = `Uniformes y dotaciones corporativas de alta calidad. Más de ${anios} años de experiencia en Colombia.`;

    this.setMetaContent('description', descripcion);
    this.setMetaProperty('og:description', ogDescripcion);
    this.setMetaName('twitter:description', twitterDescripcion);
  }

  private setMetaContent(name: string, content: string): void {
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el) {
      el.setAttribute('content', content);
    }
  }

  private setMetaProperty(property: string, content: string): void {
    const el = document.querySelector(`meta[property="${property}"]`);
    if (el) {
      el.setAttribute('content', content);
    }
  }

  private setMetaName(name: string, content: string): void {
    const el = document.querySelector(`meta[name="${name}"]`);
    if (el) {
      el.setAttribute('content', content);
    }
  }
}
