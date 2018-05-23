import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import { CobroResolver } from './services';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.IngresosComponent,
    children: [
      { path: 'cobros', component: fromContainers.CobrosComponent },
      { path: 'cobros/create', component: fromContainers.CobroCreateComponent },
      { path: 'cobros/:id', component: fromContainers.CobroEditComponent },
      {
        path: 'fichas',
        component: fromContainers.FichasComponent,
        data: { tipo: 'CREDITO' }
      },
      {
        path: 'fichasContado',
        component: fromContainers.FichasComponent,
        data: { tipo: 'CONTADO' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule {}
