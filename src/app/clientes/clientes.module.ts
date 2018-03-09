import { ModuleWithProviders, NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';

import { reducers } from './store/index';

import { SharedModule } from '../_shared/shared.module';
import { ClientesRoutingModule } from './clientes-routing.module';

// components
import * as fromComponents from './components';
// containers
import * as fromContainers from './containers';
// services
import * as fromServices from './services';
import { CurrencyPipe, DatePipe } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    ClientesRoutingModule,
    StoreModule.forFeature('clientes', reducers)
  ],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [fromComponents.ClienteFieldComponent],
  entryComponents: [...fromComponents.entryComponents]
})
export class ClientesModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ClientesModule,
      providers: [...fromServices.services, DatePipe, CurrencyPipe]
    };
  }
}
