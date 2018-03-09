import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from '@ngrx/store';

import * as fromClientes from './clientes.reducer';

export interface ClientesState {
  clientes: fromClientes.ClienteState;
}

export const reducers: ActionReducerMap<ClientesState> = {
  clientes: fromClientes.reducer
};

export const getClientesState = createFeatureSelector<ClientesState>(
  'clientes'
);

export const getClienteState = createSelector(
  getClientesState,
  (state: ClientesState) => state.clientes
);

export const getAllClientes = createSelector(
  getClienteState,
  fromClientes.getClientes
);
export const getClientesLoadig = createSelector(
  getClienteState,
  fromClientes.getClientesLoading
);
export const getClientesLoaded = createSelector(
  getClienteState,
  fromClientes.getClientesLoaded
);
