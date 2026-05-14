import { Component, HostListener, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Offcanvas } from 'bootstrap';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: false,
})
export class MenuComponent {
  private readonly router = inject(Router);

  scrolled = false;
  /** Desplaza el fondo del menú móvil al hacer scroll (efecto parallax). */
  parallaxBgShift = '0px';

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
    const proceed = () => this.goHomeAndScroll(fragment);

    if (panel.classList.contains('show')) {
      let finished = false;
      const runOnce = () => {
        if (finished) {
          return;
        }
        finished = true;
        proceed();
      };
      panel.addEventListener('hidden.bs.offcanvas', runOnce, { once: true });
      inst.hide();
      setTimeout(runOnce, 650);
    } else {
      proceed();
    }
  }

  private goHomeAndScroll(fragment: string | null): void {
    if (!fragment) {
      void this.router.navigate(['/']).then(() => {
        setTimeout(() => globalThis.scrollTo({ top: 0, behavior: 'smooth' }), 80);
      });
      return;
    }

    void this.router.navigate(['/'], { fragment }).then(() => {
      setTimeout(() => this.scrollToFragment(fragment), 200);
    });
  }

  private scrollToFragment(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
