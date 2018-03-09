import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteInfoComponent } from './cliente-info/cliente-info.component';
import { ClienteVentasComponent } from './cliente-ventas/cliente-ventas.component';
import { ClienteFacturasComponent } from './cliente-facturas/cliente-facturas.component';
import { ClienteNotasComponent } from './cliente-notas/cliente-notas.component';
import { ClienteCargosComponent } from './cliente-cargos/cliente-cargos.component';
import { ClienteCobrosComponent } from './cliente-cobros/cliente-cobros.component';
import { EstadoDeCuentaComponent } from './estado-de-cuenta/estado-de-cuenta.component';
import { ClienteCxcComponent } from './cliente-cxc/cliente-cxc.component';

export const containers: any[] = [
  ClientesListComponent,
  ClienteComponent,
  ClienteInfoComponent,
  ClienteCxcComponent,
  ClienteVentasComponent,
  ClienteFacturasComponent,
  ClienteNotasComponent,
  ClienteCargosComponent,
  ClienteCobrosComponent,
  EstadoDeCuentaComponent
];

export * from './clientes-list/clientes-list.component';
export * from './cliente/cliente.component';
export * from './cliente-info/cliente-info.component';
export * from './cliente-ventas/cliente-ventas.component';
export * from './cliente-facturas/cliente-facturas.component';
export * from './cliente-notas/cliente-notas.component';
export * from './cliente-cargos/cliente-cargos.component';
export * from './cliente-cobros/cliente-cobros.component';
export * from './estado-de-cuenta/estado-de-cuenta.component';
export * from './cliente-cxc/cliente-cxc.component';
