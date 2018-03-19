import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudesPendientesComponent } from './solicitudes-pendientes/solicitudes-pendientes.component';
import { SolicitudesAutorizadasComponent } from './solicitudes-autorizadas/solicitudes-autorizadas.component';
import { SolicitudesCanceladasComponent } from './solicitudes-canceladas/solicitudes-canceladas.component';
import { SolicitudesTransitoComponent } from './solicitudes-transito/solicitudes-transito.component';

export const containers = [
  SolicitudesComponent,
  SolicitudesPendientesComponent,
  SolicitudesAutorizadasComponent,
  SolicitudesCanceladasComponent,
  SolicitudesTransitoComponent
];

export * from './solicitudes/solicitudes.component';
export * from './solicitudes-pendientes/solicitudes-pendientes.component';
export * from './solicitudes-autorizadas/solicitudes-autorizadas.component';
export * from './solicitudes-canceladas/solicitudes-canceladas.component';
export * from './solicitudes-transito/solicitudes-transito.component';
