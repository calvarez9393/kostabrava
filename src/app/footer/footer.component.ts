import { Component } from '@angular/core';
import { aniosDesdeFundacion } from '../anios-empresa';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  standalone: false,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly aniosEmpresa = aniosDesdeFundacion();
}
