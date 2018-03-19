import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

import { SolicitudDeDeposito } from '../../models';
import { SolicitudService } from '../../services';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

@Component({
  selector: 'sx-solicitudes-transito',
  templateUrl: './solicitudes-transito.component.html',
  styles: []
})
export class SolicitudesTransitoComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', width: 70 },
    { name: 'sucursal', label: 'Sucursal', width: 120 },
    { name: 'cliente.nombre', label: 'Cliente' },
    { name: 'fechaDeposito', label: 'Fecha D', width: 100 },
    { name: 'total', label: 'Total', width: 100 },
    { name: 'comentario', label: 'Comentario' }
  ];

  solicitudes = [];
  solicitudes$: Observable<SolicitudDeDeposito[]>;
  procesando = false;

  search$ = new BehaviorSubject<string>('');

  filter: {
    folio?: number;
    cliente?: string;
    sucursal?: string;
    total?: number;
    fechaDeposito?: string;
  } = {};

  constructor(
    private service: SolicitudService,
    private pagoUtils: PagosUtils
  ) {}

  ngOnInit() {
    // this.solicitudes$.subscribe( res => this.solicitudes = res);
    this.load();
  }

  load() {
    this.procesando = true;
    this.solicitudes$ = this.service
      .transito(this.filter)
      .do(term => (this.procesando = true))
      .catch(err => this.handleError(err))
      .finally(() => (this.procesando = false));
  }

  searchFolio(folio) {
    this.filter.folio = folio;
    this.load();
  }
  searchTotal(total) {
    this.filter.total = total;
    this.load();
  }
  searchCliente(cliente) {
    this.filter.cliente = cliente;
    this.load();
  }
  searchSucursal(sucursal) {
    this.filter.sucursal = sucursal;
    this.load();
  }
  searchFecha(fecha: Date) {
    if (fecha !== null && _.isDate(fecha)) {
      this.filter.fechaDeposito = fecha.toISOString();
    } else {
      this.filter.fechaDeposito = null;
    }
    this.load();
  }

  handleError(err) {
    console.error('Error: ', err);
    return Observable.of(err);
  }

  getFormaDePago(formaDePago) {
    return this.pagoUtils.slim(formaDePago);
  }
}
