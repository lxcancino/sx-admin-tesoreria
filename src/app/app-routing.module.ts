import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './_core/containers/main-page/main-page.component';
import { HomePageComponent } from './_core/containers/home-page/home-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      { path: '', component: HomePageComponent },
      {
        path: 'clientes',
        loadChildren: './clientes/clientes.module#ClientesModule'
      },
      {
        path: 'solicitudes',
        loadChildren: './solicitudes/solicitudes.module#SolicitudesModule'
      },
      {
        path: 'ingresos',
        loadChildren: './ingresos/ingresos.module#IngresosModule'
      },
      {
        path: 'cortesTarjeta',
        loadChildren:
          './cortes-tarjeta/cortes-tarjeta.module#CortesTarjetaModule'
      },
      {
        path: 'movimientos',
        loadChildren: './movimientos/movimientos.module#MovimientosModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
