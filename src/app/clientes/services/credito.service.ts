import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from 'app/utils/config.service';
import { Cliente, LineaDeCredito } from '../models';

@Injectable()
export class CreditoService {
  private apiUrl: string;

  constructor(private http: HttpClient, config: ConfigService) {
    this.apiUrl = config.buildApiUrl('clientes');
  }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  save(cliente: Cliente) {
    return this.http.post(this.apiUrl, cliente);
  }

  update(cliente: Cliente, credito: LineaDeCredito) {
    const url = `${this.apiUrl}/${cliente.id}/credito/${credito.id}`;
    return this.http.put(url, credito);
  }
}
