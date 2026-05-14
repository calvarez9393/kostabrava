import { ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

export interface Image {
  url: string;
  titulo?: string;
  alt?: string;
}

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css'],
  standalone: false,
})
export class GaleriaComponent implements OnChanges {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() imagenes: Image[] = [];
  /** Índice del slide; se sincroniza con p-galleria vía (activeIndexChange). */
  activeIndex = 0;

  responsiveOptions = [
    { breakpoint: '1024px', numVisible: 5 },
    { breakpoint: '768px', numVisible: 3 },
    { breakpoint: '560px', numVisible: 2 },
  ];

  constructor(public activeModal: NgbActiveModal) {}

  /** Imagen principal: siempre desde nuestro índice (evita desincronía con el template de PrimeNG en modal). */
  get currentImage(): Image | undefined {
    const list = this.imagenes;
    if (!list?.length) {
      return undefined;
    }
    const i = Math.min(Math.max(this.activeIndex, 0), list.length - 1);
    return list[i];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imagenes']) {
      this.activeIndex = 0;
      this.cdr.markForCheck();
    }
  }

  onSlideChange(index: number): void {
    const max = Math.max(0, this.imagenes.length - 1);
    const next = Math.min(Math.max(0, index), max);
    if (this.activeIndex !== next) {
      this.activeIndex = next;
    }
    // PrimeNG OnPush + contenido en modal: forzar actualización del <img> principal.
    this.cdr.detectChanges();
  }

  prevSlide(): void {
    const n = this.imagenes.length;
    if (n < 2) {
      return;
    }
    const i = this.activeIndex <= 0 ? n - 1 : this.activeIndex - 1;
    this.onSlideChange(i);
  }

  nextSlide(): void {
    const n = this.imagenes.length;
    if (n < 2) {
      return;
    }
    const i = this.activeIndex >= n - 1 ? 0 : this.activeIndex + 1;
    this.onSlideChange(i);
  }
}
