import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import * as _ from 'lodash';

import { ConfigService } from '../../utils/config.service';
import { MovimientoDeTesoreria } from 'app/models/movimientoDeTesoreria';
import { CuentaDeBanco } from 'app/models/cuentaDeBanco';

@Injectable()
export class MovimientosDeTesoreriaService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('tesoreria/movimientosDeTesoreria');
  }

  get(id: string): Observable<MovimientoDeTesoreria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<MovimientoDeTesoreria>(url);
  }

  cuentas(): Observable<CuentaDeBanco[]> {
    const url = this.config.buildApiUrl('tesoreria/cuentas');
    return this.http.get(url).pipe(catchError(err => Observable.of(err)));
  }

  list(filtro: {} = {}): Observable<MovimientoDeTesoreria[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<MovimientoDeTesoreria[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  save(mov: MovimientoDeTesoreria) {
    return this.http.post(this.apiUrl, mov);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
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
}
