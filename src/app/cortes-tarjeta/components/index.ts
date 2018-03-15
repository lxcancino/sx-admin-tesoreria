import { CortesSucursalComponent } from './cortes-sucursal/cortes-sucursal.component';
import { CobrosTarjetaTableComponent } from './cobros-tarjeta-table/cobros-tarjeta-table.component';
import { CobroTarjetaDialogComponent } from './cobro-tarjeta-dialog/cobro-tarjeta-dialog.component';
import { CortesTarjetaTableComponent } from './cortes-tarjeta-table/cortes-tarjeta-table.component';
import { CorteTarjetaFormComponent } from './corte-tarjeta-form/corte-tarjeta-form.component';

export const components = [
  CortesSucursalComponent,
  CobrosTarjetaTableComponent,
  CobroTarjetaDialogComponent,
  CortesTarjetaTableComponent,
  CorteTarjetaFormComponent
];
export const entryComponents = [CobroTarjetaDialogComponent];

export * from './cortes-sucursal/cortes-sucursal.component';
export * from './cobros-tarjeta-table/cobros-tarjeta-table.component';
export * from './cobro-tarjeta-dialog/cobro-tarjeta-dialog.component';
export * from './cortes-tarjeta-table/cortes-tarjeta-table.component';
export * from './corte-tarjeta-form/corte-tarjeta-form.component';
