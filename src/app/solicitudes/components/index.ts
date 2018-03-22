import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudesTableComponent } from './solicitudes-table/solicitudes-table.component';
import { SolicitudesPendientesTableComponent } from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
import { AutorizacionFormComponent } from './autorizacion-form/autorizacion-form.component';
import { FacturasCobradasComponent } from './facturas-cobradas/facturas-cobradas.component';
import { CobranzaCodComponent } from './cobranza-cod/cobranza-cod.component';

export const components = [
  SolicitudFormComponent,
  SolicitudesTableComponent,
  SolicitudesPendientesTableComponent,
  AutorizacionFormComponent,
  FacturasCobradasComponent,
  CobranzaCodComponent
];

export const entryComponents = [
  SolicitudFormComponent,
  AutorizacionFormComponent,
  FacturasCobradasComponent,
  CobranzaCodComponent
];

export * from './solicitud-form/solicitud-form.component';
export * from './solicitudes-table/solicitudes-table.component';
export * from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
export * from './autorizacion-form/autorizacion-form.component';
export * from './facturas-cobradas/facturas-cobradas.component';
export * from './cobranza-cod/cobranza-cod.component';
