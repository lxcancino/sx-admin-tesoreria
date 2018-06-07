import { IngresosComponent } from './inresos/ingresos.component';
import { CobrosComponent } from './cobros/cobros.component';
import { CobroComponent } from './cobro/cobro.component';
import { CobroCreateComponent } from './cobro/cobro-create.component';
import { CobroEditComponent } from './cobro/cobro-edit.component';
import { FichasComponent } from './fichas/fichas.component';
import { ChequesDevueltosComponent } from './cheques-devueltos/cheques-devueltos.compoent';

export const containers: any[] = [
  IngresosComponent,
  CobrosComponent,
  CobroComponent,
  CobroCreateComponent,
  CobroEditComponent,
  FichasComponent,
  ChequesDevueltosComponent
];

export * from './inresos/ingresos.component';
export * from './cobros/cobros.component';
export * from './cobro/cobro.component';
export * from './cobro/cobro-create.component';
export * from './cobro/cobro-edit.component';
export * from './fichas/fichas.component';
export * from './cheques-devueltos/cheques-devueltos.compoent';
