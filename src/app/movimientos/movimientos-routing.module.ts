import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  MovimientosTesoreriaComponent,
  DepositosRetirosComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: MovimientosTesoreriaComponent,
    children: [
      { path: 'depositosRetiros', component: DepositosRetirosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimientosRoutingModule {}
