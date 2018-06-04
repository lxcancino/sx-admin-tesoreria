import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'sx-cobros',
  templateUrl: './cobros.component.html',
  styles: [
    `
    .cobros-table-container {
      height: 650px;
      overflow: auto;
    }
  `
  ]
})
export class CobrosComponent implements OnInit, OnDestroy {
  cobros$: Observable<Cobro[]>;
  term = '';
  procesando = false;
  _fecha: Date;
  _fecha2: Date;
  _importe: number;

  // filter: { fecha?: Date; term?: string } = {};

  constructor(
    private servie: CobrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const filter = JSON.parse(localStorage.getItem('SX_TES_COBROS_FILTER'));
    if (filter && filter.fecha) {
      this.fecha = moment(filter.fecha).toDate();
    }
    this.load();
  }

  ngOnDestroy() {
    const filter: any = { term: this.term };
    if (this.fecha) {
      filter.fecha = this.fecha;
    }
    localStorage.setItem('SX_TES_COBROS_FILTER', JSON.stringify(filter));
  }

  load() {
    this.procesando = true;
    const fil: any = { term: this.term };
    if (this.fecha) {
      fil.fecha = this.fecha.toISOString();
    }
    if (this.fecha2) {
      fil.fechaFin = this.fecha2.toISOString();
    }
    if (this.importe) {
      fil.importe = this.importe;
    }
    this.cobros$ = this.servie
      .cobrosMonetarios(fil)
      .pipe(
        catchError(err => Observable.of(err)),
        finalize(() => (this.procesando = false))
      );
  }

  onSearch(event) {
    this.term = event;
    this.load();
  }

  onSelect(cobro: Cobro) {
    console.log('Editando cobro: ', cobro);
    this.router.navigate(['ingresos/cobros/', cobro.id]);
  }

  insert() {
    console.log('Insert cobro....');
  }
  get fecha() {
    return this._fecha;
  }
  set fecha(val: Date) {
    this._fecha = val;
    this.load();
  }

  get fecha2() {
    return this._fecha2;
  }
  set fecha2(val: Date) {
    this._fecha2 = val;
    this.load();
  }

  get importe() {
    return this._importe;
  }

  set importe(monto: number) {
    this._importe = monto;
    console.log('Importe: ', this.importe);
    this.load();
  }
}
