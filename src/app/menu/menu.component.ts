import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  scrolled = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.scrolled = window.pageYOffset > 50;
  }
}
