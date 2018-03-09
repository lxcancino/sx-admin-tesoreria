import { Action } from '@ngrx/store';
import { Cliente } from '../../models';

export const LOAD_CLIENTES = '[Clientes] Load Clientes';
export const LOAD_CLIENTES_FAIL = '[Clientes] Load Clientes Fail';
export const LOAD_CLIENTES_SUCCESS = '[Clientes] Load Clientes Success';


export class LoadClientes implements Action {
  readonly type = LOAD_CLIENTES;
}

export class LoadClientesFail implements Action {
  readonly type = LOAD_CLIENTES_FAIL;

  constructor(public payload: any) {}
}

export class LoadClientesSuccess implements Action {
  readonly type = LOAD_CLIENTES_SUCCESS;

  constructor(public payload: Cliente[]) {}
}

// Action types
export type ClientesAction = LoadClientes | LoadClientesFail | LoadClientesSuccess;
