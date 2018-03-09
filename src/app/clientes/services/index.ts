import { ClienteService } from './cliente.service';
import { ClienteResolver } from './cliente.resolver';
import { CreditoService } from './credito.service';

export const services: any[] = [
  ClienteService,
  ClienteResolver,
  CreditoService
];

export * from './cliente.service';
export * from './cliente.resolver';
export * from './credito.service';
