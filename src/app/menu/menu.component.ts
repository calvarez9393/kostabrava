import { AfterViewInit, Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false,
})
export class MenuComponent implements AfterViewInit {
  private readonly router = inject(Router);

  scrolled = false;
  /** Desplaza el fondo del menú móvil al hacer scroll (efecto parallax). */
  parallaxBgShift = '0px';

  ngAfterViewInit(): void {
    const panel = document.getElementById('kbMobileNav');
    panel?.addEventListener('hidden.bs.offcanvas', () => this.cleanupOffcanvasUi());
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const y = globalThis.scrollY;
    this.scrolled = y > 50;
    this.parallaxBgShift = `${Math.min(y * 0.2, 160)}px`;
  }

  /** Escritorio: siempre va a `/` y hace scroll a la sección (también desde catálogo). */
  onDesktopNav(event: MouseEvent, fragment: string | null): void {
    event.preventDefault();
    this.goHomeAndScroll(fragment);
  }

  /** Móvil: cierra el offcanvas y luego navega + scroll (evita race con `data-bs-dismiss`). */
  onMobileNav(event: MouseEvent, fragment: string | null): void {
    event.preventDefault();
    const panel = document.getElementById('kbMobileNav');
    if (!panel) {
      this.goHomeAndScroll(fragment);
      return;
    }

    const inst = Offcanvas.getInstance(panel) ?? Offcanvas.getOrCreateInstance(panel);
    const proceed = () => {
      this.cleanupOffcanvasUi();
      this.goHomeAndScroll(fragment);
    };

    if (panel.classList.contains('show')) {
      let finished = false;
      const runOnce = () => {
        if (finished) {
          return;
        }
        finished = true;
        proceed();
      };
      // Importante: no navegar antes del evento `hidden` (si no, el backdrop puede quedar colgado).
      panel.addEventListener('hidden.bs.offcanvas', runOnce, { once: true });
      inst.hide();
      // Fallback largo: solo si Bootstrap no emitió `hidden` (p. ej. transición muy lenta).
      setTimeout(() => {
        if (!finished) {
          panel.classList.remove('show');
          this.cleanupOffcanvasUi();
          runOnce();
        }
      }, 1600);
    } else {
      proceed();
    }
  }

  private goHomeAndScroll(fragment: string | null): void {
    if (!fragment) {
      void this.router.navigate(['/']).then(() => {
        this.cleanupOffcanvasUi();
        setTimeout(() => globalThis.scrollTo({ top: 0, behavior: 'smooth' }), 80);
      });
      return;
    }

    void this.router.navigate(['/'], { fragment }).then(() => {
      this.cleanupOffcanvasUi();
      setTimeout(() => this.scrollToFragment(fragment), 200);
    });
  }

  /** Quita backdrop y estilos que a veces quedan al cerrar offcanvas + navegar con el router. */
  private cleanupOffcanvasUi(): void {
    document.querySelectorAll('.offcanvas-backdrop').forEach((el) => el.remove());
    document.body.classList.remove('offcanvas-backdrop');
    document.body.removeAttribute('data-bs-overflow');
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('padding-right');
    document.documentElement.style.removeProperty('overflow');
  }

  private scrollToFragment(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
