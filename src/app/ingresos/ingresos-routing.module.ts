import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CobrosComponent } from './containers';
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
      { path: 'fichas', component: fromContainers.FichasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngresosRoutingModule {}
