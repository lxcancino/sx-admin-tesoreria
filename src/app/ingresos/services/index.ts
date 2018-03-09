import { CobrosService } from './cobros.service';
import { CobroResolver } from './cobro.resolver';
import { NotascxcService } from './notascxc.service';
import { NotadecargoService } from './notadeCargo.service';
import { FichasService } from './fichas.service';

export const services: any[] = [
  CobrosService,
  CobroResolver,
  NotascxcService,
  NotadecargoService,
  FichasService
];

export * from './cobros.service';
export * from './cobro.resolver';
export * from './notascxc.service';
export * from './notadeCargo.service';
export * from './fichas.service';
