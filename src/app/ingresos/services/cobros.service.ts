import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as moment from 'moment';

import { ConfigService } from '../../utils/config.service';
import { Cobro } from '../models/cobro';
import { catchError } from 'rxjs/operators';
import { Cliente } from '../../clientes/models';

@Injectable()
export class CobrosService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/cobro');
  }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url);
  }

  list(filtro: {} = {}): Observable<Cobro[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<Cobro[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  cobrosMonetarios(filtro: any = {}) {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/cobrosMonetarios`;
    return this.http
      .get<Cobro[]>(url, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  reporteDeComisionesTarjeta(sucursal, fecha: Date) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha.toISOString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    const url = `${this.apiUrl}/reporteDeComisionesTarjeta`;
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }

  save(com: Cobro) {
    return this.http.post(this.apiUrl, com);
  }

  update(com: Cobro) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  registrarChequeDevuelto(fecha: Date, com: Cobro): Observable<Cobro> {
    const url = `${this.apiUrl}/registrarChequeDevuelto/${com.id}`;
    const params = new HttpParams().set(
      'fecha',
      moment(fecha).format('DD/MM/YYYY')
    );
    return this.http.put<Cobro>(url, {}, { params: params });
  }

  sucursales(): Observable<any> {
    const params = new HttpParams().set('activas', 'activas');
    const url = this.config.buildApiUrl('sucursales');
    return this.http.get<Observable<any>>(url, { params: params });
  }

  cobradores(): Observable<any> {
    const url = this.config.buildApiUrl('cobradores');
    return this.http.get<Observable<any>>(url);
  }

  cuentasPorCobrar(cliente: { id: string; nombre: string }): Observable<any> {
    const url = this.config.buildApiUrl(
      `cuentasPorCobrar/pendientes/${cliente.id}`
    );
    return this.http.get<Observable<any>>(url);
  }

  aplicarCobro(cobro: Cobro, cxc: any) {
    const params = new HttpParams().set('cxc', cxc.id);
    const url = `${this.apiUrl}/aplicar/${cobro.id}`;
    return this.http
      .put(url, {}, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  reporteDeRelacionDePagos(fecha, cartera: string, cobrador) {
    const url = `${this.apiUrl}/reporteDeRelacionDePagos`;
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('origen', cartera)
      .set('cobrador', cobrador);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
