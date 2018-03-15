import { SolicitudFormComponent } from './solicitud-form/solicitud-form.component';
import { SolicitudesTableComponent } from './solicitudes-table/solicitudes-table.component';
import { SolicitudesPendientesTableComponent } from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
import { AutorizacionFormComponent } from './autorizacion-form/autorizacion-form.component';

export const components = [
  SolicitudFormComponent,
  SolicitudesTableComponent,
  SolicitudesPendientesTableComponent,
  AutorizacionFormComponent
];

export const entryComponents = [
  SolicitudFormComponent,
  AutorizacionFormComponent
];

export * from './solicitud-form/solicitud-form.component';
export * from './solicitudes-table/solicitudes-table.component';
export * from './solicitudes-pendientes-table/solicitudes-pendientes-table.component';
export * from './autorizacion-form/autorizacion-form.component';
