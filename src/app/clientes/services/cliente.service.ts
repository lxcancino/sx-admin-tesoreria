import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from 'app/utils/config.service';
import { Cliente } from '../models';

@Injectable()
export class ClienteService {
  private apiUrl: string;

  constructor(private http: HttpClient, config: ConfigService) {
    this.apiUrl = config.buildApiUrl('clientes');
  }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url);
  }

  list(filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<Cliente[]>(this.apiUrl, { params: params });
  }

  save(cliente: Cliente) {
    return this.http.post(this.apiUrl, cliente);
  }

  update(cliente: Cliente) {
    const url = `${this.apiUrl}/${cliente.id}`;
    return this.http.put(url, cliente);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  facturas(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/facturas`;
    return this.http.get<Cliente[]>(url, { params: params });
  }

  cxc(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/cxc`;
    return this.http.get<Cliente[]>(url, { params: params });
  }

  notas(cliente: Cliente, filtro?: any): Observable<any[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/notas`;
    return this.http.get<any[]>(url, { params: params });
  }

  cobros(cliente: Cliente, filtro?: any): Observable<Cliente[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/${cliente.id}/cobros`;
    return this.http.get<Cliente[]>(url, { params: params });
  }

  estadoDeCuenta(cliente: Cliente, fecha: Date, cartera: string) {
    const url = `${this.apiUrl}/estadoDeCuenta`;
    const params = new HttpParams()
      .set('fecha', fecha.toISOString())
      .set('cartera', cartera)
      .set('cliente', cliente.id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
