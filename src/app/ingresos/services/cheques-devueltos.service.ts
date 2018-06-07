import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment';

import { ConfigService } from '../../utils/config.service';
import { ChequeDevuelto } from '../models/chequeDevuelto';

@Injectable()
export class ChequesDevueltosService {
  private apiUrl: string;

  constructor(private http: HttpClient, private config: ConfigService) {
    this.apiUrl = config.buildApiUrl('cxc/cheques');
  }

  update(che: ChequeDevuelto) {
    const url = `${this.apiUrl}/${che.id}`;
    return this.http.put(url, che).pipe(catchError(err => Observable.of(err)));
  }

  get(id: string): Observable<ChequeDevuelto> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<ChequeDevuelto>(url);
  }

  list(filtro: {} = {}): Observable<ChequeDevuelto[]> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http
      .get<ChequeDevuelto[]>(this.apiUrl, { params: params })
      .pipe(catchError(err => Observable.of(err)));
  }

  reporteDeChequesDevueltos(fecha: Date) {
    const params = new HttpParams().set(
      'fecha',
      moment(fecha).format('DD/MM/YYYY')
    );
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    const url = `${this.apiUrl}/reporteDeChequesDevueltos`;
    return this.http.get(url, {
      headers: headers,
      params: params,
      responseType: 'blob'
    });
  }
}
