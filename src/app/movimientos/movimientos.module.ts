import { NgModule } from '@angular/core';

import { MovimientosRoutingModule } from './movimientos-routing.module';
import { SharedModule } from '../_shared/shared.module';

// components
import { containers } from './containers';

@NgModule({
  imports: [SharedModule, MovimientosRoutingModule],
  declarations: [...containers]
})
export class MovimientosModule {}
