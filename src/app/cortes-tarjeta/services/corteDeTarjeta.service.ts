import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';
import { CorteDeTarjeta } from '../models/corteDeTarjeta';

@Injectable()
export class CorteDeTarjetaService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/cortesTarjeta');
  }

  get(id: string): Observable<CorteDeTarjeta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CorteDeTarjeta>(url);
  }

  pendientes(filtro: {} = {}): Observable<Array<any>> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/pendientes`;
    return this.http
      .get<any[]>(url, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  list(filtro: {} = {}): Observable<CorteDeTarjeta[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<CorteDeTarjeta[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  reporteDeCortesTarjeta(sucursal, fecha: Date) {
    const params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha', fecha.toISOString());
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    const url = `${this.apiUrl}/reporteDeCortesTarjeta`;
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
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

  generar(cobrosPorSucursal) {
    const url = `${this.apiUrl}/generarCortes`;
    return this.http
      .post(url, cobrosPorSucursal)
      .pipe(catchError(err => Observable.of(err)));
  }

  save(corte: CorteDeTarjeta) {
    return this.http
      .post(this.apiUrl, corte)
      .pipe(catchError(err => Observable.of(err)));
  }

  update(corte: CorteDeTarjeta) {
    const url = `${this.apiUrl}/${corte.id}`;
    return this.http
      .put(url, corte)
      .pipe(catchError(err => Observable.of(err)));
  }

  updateCobro(cobro) {
    const url = `${this.apiUrl}/ajustarCobro`;
    return this.http
      .put(url, cobro)
      .pipe(catchError(err => Observable.of(err)));
  }

  aplicar(corte) {
    const url = `${this.apiUrl}/aplicar/${corte.id}`;
    return this.http.put(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  cancelarAplicacion(corte) {
    const url = `${this.apiUrl}/cancelarAplicacion/${corte.id}`;
    return this.http.put(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url).pipe(catchError(err => Observable.of(err)));
  }

  sucursales(): Observable<any> {
    const params = new HttpParams().set('activas', 'activas');
    const url = this.config.buildApiUrl('sucursales');
    return this.http.get<Observable<any>>(url, { params: params });
  }
}
