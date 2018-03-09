import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { ConfigService } from '../../utils/config.service';

@Injectable()
export class NotascxcService {
  private apiUrl: string;

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.apiUrl = configService.buildApiUrl('cxc/notas');
  }

  get(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  list(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    return this.http.get<any>(this.apiUrl, { params: params }).shareReplay();
  }

  buscarRmd(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = this.apiUrl + '/buscarRmd';
    return this.http.get<any>(url, { params: params });
  }

  buscarFacturasPendientes(filtro?): Observable<any> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = this.apiUrl + '/buscarFacturasPendientes';
    return this.http.get<any>(url, { params: params });
  }

  generarNotaDeDevolucion(rmd, cartera) {
    const params = new HttpParams().set('cartera', cartera);
    const url = `${this.apiUrl}/generarConRmd/${rmd.id}`;
    return this.http.post(url, {}, { params: params });
  }

  timbrar(nota) {
    const url = `${this.apiUrl}/timbrar/${nota.id}`;
    return this.http.post(url, {});
  }

  aplicar(nota) {
    const url = `${this.apiUrl}/aplicar/${nota.id}`;
    return this.http.post(url, {});
  }

  save(nota) {
    nota.cliente = { id: nota.cliente.id };
    return this.http.post(this.apiUrl, nota);
  }

  print(nota) {
    const url = `${this.apiUrl}/print/${nota.id}`;
    const headers = new HttpHeaders().set('Content-type', 'application/pdf');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  mostrarXml(nota): Observable<any> {
    const endpoint = `cfdis/mostrarXml/${nota.cfdi.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type', 'text/xml');
    return this.http.get(url, {
      headers: headers,
      responseType: 'blob'
    });
  }

  enviarPorEmail(cfdi, target: string): Observable<any> {
    const endpoint = `cfdis/enviarEmail/${cfdi.id}`;
    const params = new HttpParams().set('target', target);
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.put(url, {}, { params: params });
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
