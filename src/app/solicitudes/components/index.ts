import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudesTableComponent } from './solicitudes-table/solicitudes-table.component';
import { SolicitudesPendientesTableComponent } from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
import { AutorizacionFormComponent } from './autorizacion-form/autorizacion-form.component';
import { FacturasCobradasComponent } from './facturas-cobradas/facturas-cobradas.component';
import { CobranzaCodComponent } from './cobranza-cod/cobranza-cod.component';
import { DisponiblesDialogComponent } from './disponibes-dialog/disponibles-dialog.component';
import { VentasDiariasDialogComponent } from './ventas-diarias-dialog/ventas-diarias-dialog.component';

export const components = [
  SolicitudFormComponent,
  SolicitudesTableComponent,
  SolicitudesPendientesTableComponent,
  AutorizacionFormComponent,
  FacturasCobradasComponent,
  CobranzaCodComponent,
  DisponiblesDialogComponent,
  VentasDiariasDialogComponent
];

export const entryComponents = [
  SolicitudFormComponent,
  AutorizacionFormComponent,
  FacturasCobradasComponent,
  CobranzaCodComponent,
  DisponiblesDialogComponent,
  VentasDiariasDialogComponent
];

export * from './solicitud-form/solicitud-form.component';
export * from './solicitudes-table/solicitudes-table.component';
export * from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
export * from './autorizacion-form/autorizacion-form.component';
export * from './facturas-cobradas/facturas-cobradas.component';
export * from './cobranza-cod/cobranza-cod.component';
export * from './disponibes-dialog/disponibles-dialog.component';
export * from './ventas-diarias-dialog/ventas-diarias-dialog.component';
