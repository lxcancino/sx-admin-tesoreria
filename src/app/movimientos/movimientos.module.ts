import { NgModule } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { SharedModule } from '../_shared/shared.module';

// containers
import { containers } from './containers';
// components
import { components } from './components';

@NgModule({
  imports: [SharedModule, MovimientosRoutingModule],
  declarations: [...components, ...containers],
  providers: [DatePipe, CurrencyPipe]
})
export class MovimientosModule {}
