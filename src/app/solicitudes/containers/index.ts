import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesAutorizadasComponent } from './solicitudes-autorizadas/solicitudes-autorizadas.component';

export const containers = [
  SolicitudesComponent,
  SolicitudesPendientesComponent,
  SolicitudesAutorizadasComponent
];

export * from './solicitudes/solicitudes.component';
export * from './solicitudes-pendientes/solicitudes-pendientes.component';
export * from './solicitudes-autorizadas/solicitudes-autorizadas.component';
