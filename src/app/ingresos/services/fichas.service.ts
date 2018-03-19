import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';

import { catchError } from 'rxjs/operators';
import { Ficha } from '../models/ficha';

@Injectable()
export class FichasService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/fichas');
  }

  get(id: string): Observable<Ficha> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Ficha>(url);
  }

  generar(filtro: any = {}) {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/generar`;
    return this.http
      .get(url, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  list(filtro: {} = {}): Observable<Ficha[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<Ficha[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  save(ficha: Ficha) {
    return this.http.post(this.apiUrl, ficha);
  }

  update(ficha: Ficha) {
    const url = `${this.apiUrl}/${ficha.id}`;
    return this.http.put(url, ficha);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  cheques(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/cheques`;
    return this.http.get<any>(url);
  }

  ingreso(id: string) {
    const url = `${this.apiUrl}/${id}/ingreso`;
    return this.http.get(url).pipe(catchError(err => Observable.of(err)));
  }

  reporteCorteTarjeta(sucursal, fecha: Date) {
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

  reporteDeRelacionDeFichas(fecha, origen: string) {
    const url = `${this.apiUrl}/reporteDeRelacionDeFichas`;
    const params = new HttpParams()
      .set('fecha', fecha)
      .set('origen', origen)
      .set('sucursal', this.config.getAppConfig().sucursal.id);
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
