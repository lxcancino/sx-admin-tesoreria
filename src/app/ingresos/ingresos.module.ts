import { NgModule } from '@angular/core';

import { IngresosRoutingModule } from './ingresos-routing.module';
import { SharedModule } from '../_shared/shared.module';

// Components
import { components, entryComponents } from './components';
// Containers
import { containers } from './containers';
// Services
import { services } from './services';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ClientesModule } from '../clientes/clientes.module';

@NgModule({
  imports: [SharedModule, IngresosRoutingModule, ClientesModule],
  declarations: [...components, ...containers],
  entryComponents: [...entryComponents],
  providers: [...services, DatePipe, CurrencyPipe]
})
export class IngresosModule {}
