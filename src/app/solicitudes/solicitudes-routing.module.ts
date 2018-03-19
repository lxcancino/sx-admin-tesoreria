import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  SolicitudesComponent,
  SolicitudesPendientesComponent,
  SolicitudesAutorizadasComponent,
  SolicitudesTransitoComponent,
  SolicitudesCanceladasComponent
} from './containers';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    children: [
      { path: 'pendientes', component: SolicitudesPendientesComponent },
      { path: 'autorizadas', component: SolicitudesAutorizadasComponent },
      { path: 'transito', component: SolicitudesTransitoComponent },
      { path: 'canceladas', component: SolicitudesCanceladasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule {}
