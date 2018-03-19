import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, shareReplay } from 'rxjs/operators';
import * as _ from 'lodash';

import { SolicitudDeDeposito } from '../models/solicitudDeDeposito';
import { ConfigService } from '../../utils/config.service';
import { Periodo } from '../../_core/models/periodo';

@Injectable()
export class SolicitudService {
  private apiUrl; // = environment.apiUrl + '/tesoreria/solicitudes';

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/solicitudes');
  }

  get(id: string): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeDeposito>(url).shareReplay();
  }

  pendientes(filtro: {} = {}): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams().set('pendientes', 'pendientes');
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/pendientes`;
    return this.http.get<SolicitudDeDeposito[]>(url, { params: params });
    // .pipe(catchError(err => Observable.of(err)), shareReplay());
  }

  list(filtro: {} = {}): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<SolicitudDeDeposito[]>(this.apiUrl, {
      params: params
    });
  }

  autorizadas(
    filtro: {} = {},
    periodo?: Periodo
  ): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams();
    if (periodo) {
      params = params
        .set('periodo.fechaInicial', periodo.fechaInicial.toISOString())
        .set('periodo.fechaFinal', periodo.fechaFinal.toISOString());
    }
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/autorizadas`;
    return this.http.get<SolicitudDeDeposito[]>(url, { params: params });
  }

  transito(filtro: {} = {}): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/transito`;
    return this.http.get<SolicitudDeDeposito[]>(url, { params: params });
  }

  canceladas(filtro: {} = {}): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/canceladas`;
    return this.http.get<SolicitudDeDeposito[]>(url, { params: params });
  }

  save(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    return this.http.post<SolicitudDeDeposito>(this.apiUrl, sol);
  }

  update(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put<SolicitudDeDeposito>(url, sol);
  }

  autorizar(sol: SolicitudDeDeposito) {
    const url = `${this.apiUrl}/autorizar/${sol.id}`;
    return this.http.put(url, sol);
  }

  posponer(sol: SolicitudDeDeposito) {
    const url = `${this.apiUrl}/posponer/${sol.id}`;
    return this.http.put(url, sol);
  }

  rechazar(sol: SolicitudDeDeposito, comentario: string) {
    const url = `${this.apiUrl}/rechazar/${sol.id}`;
    const params = new HttpParams().set('comentario', comentario);
    return this.http.put(url, sol, { params: params });
  }

  cancelar(sol: SolicitudDeDeposito, comentario: string) {
    const url = `${this.apiUrl}/cancelar/${sol.id}`;
    const params = new HttpParams().set('comentario', comentario);
    return this.http.put(url, sol, { params: params });
  }

  ingreso(id: string) {
    const url = `${this.apiUrl}/ingreso/${id}`;
    return this.http.put(url, {}).pipe(catchError(err => Observable.of(err)));
  }

  buscarDupicada(id: string): Observable<any> {
    const url = `${this.apiUrl}/buscarDuplicada/${id}`;
    return this.http.get<any>(url).shareReplay();
  }
}
