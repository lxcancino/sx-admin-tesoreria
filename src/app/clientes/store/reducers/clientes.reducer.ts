import * as fromClientes from '../actions/clientes.action';
import { Cliente } from '../../models';

export interface ClienteState {
  data: Cliente[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: ClienteState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromClientes.ClientesAction
): ClienteState {
  switch (action.type) {
    case fromClientes.LOAD_CLIENTES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromClientes.LOAD_CLIENTES_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromClientes.LOAD_CLIENTES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getClientesLoading = (state: ClienteState) => state.loading;
export const getClientesLoaded = (state: ClienteState) => state.loaded;
export const getClientes = (state: ClienteState) => state.data;
