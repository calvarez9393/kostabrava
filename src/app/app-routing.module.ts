import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CatalogoComponent } from './catalogo/catalogo.component';
import { GaleriaComponent } from './galeria/galeria.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'catalogo/:id', component: CatalogoComponent},
  {path: 'galeria', component: GaleriaComponent},
  {path: '**', redirectTo: ''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
