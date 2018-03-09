import { NgModule } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { SharedModule } from '../_shared/shared.module';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { services } from './services';
import { containers } from './containers';
import { components, entryComponents } from './components';
import { ClientesModule } from '../clientes/clientes.module';

@NgModule({
  imports: [SharedModule, SolicitudesRoutingModule, ClientesModule],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, DatePipe, CurrencyPipe]
})
export class SolicitudesModule {}
