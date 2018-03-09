import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SolicitudesComponent,
  SolicitudesPendientesComponent,
  SolicitudesAutorizadasComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    children: [
      { path: 'pendientes', component: SolicitudesPendientesComponent },
      { path: 'autorizadas', component: SolicitudesAutorizadasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule {}
