import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core';

import * as moment from 'moment';
import * as _ from 'lodash';

import { GenerarFichaComponent, FichaInfoComponent } from '../../components';
import { FichasService } from '../../services';
import { Ficha } from '../../models/ficha';

@Component({
  selector: 'sx-fichas',
  templateUrl: './fichas.component.html'
})
export class FichasComponent implements OnInit, OnDestroy {
  fichas$: Observable<Ficha[]>;
  _fechaInicial = new Date();
  _sucursal = '';
  procesando = false;
  tipo: string;
  efectivo$: Observable<number>;
  otros$: Observable<number>;
  mismo$: Observable<number>;

  constructor(
    private service: FichasService,
    private dialog: MatDialog,
    private dialogService: TdDialogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => (this.tipo = data.tipo));
    const filter = JSON.parse(localStorage.getItem('SX_TES_FICHAS_FILTER'));
    if (filter) {
      this.fechaInicial = moment(filter.fechaInicial).toDate();
      this.sucursal = filter.sucursal;
    } else {
      this.load();
    }
  }

  ngOnDestroy() {
    const filter = { fechaInicial: this.fechaInicial, sucursal: this.sucursal };
    localStorage.setItem('SX_TES_FICHAS_FILTER', JSON.stringify(filter));
  }

  load() {
    this.procesando = true;
    this.fichas$ = this.service
      .list({
        fecha: this.fechaInicial.toISOString(),
        cartera: this.tipo,
        sucursal: this.sucursal
      })
      .pipe(finalize(() => (this.procesando = false)));
    this.efectivo$ = this.fichas$.map(fichas => {
      return _.sumBy(
        fichas,
        item => (item.tipoDeFicha === 'EFECTIVO' ? item.total : 0)
      );
    });

    this.otros$ = this.fichas$.map(fichas => {
      return _.sumBy(
        fichas,
        item => (item.tipoDeFicha === 'OTROS_BANCOS' ? item.total : 0)
      );
    });

    this.mismo$ = this.fichas$.map(fichas => {
      return _.sumBy(
        fichas,
        item => (item.tipoDeFicha === 'MISMO_BANCO' ? item.total : 0)
      );
    });
  }

  get fechaInicial() {
    return this._fechaInicial;
  }
  set fechaInicial(val) {
    this._fechaInicial = val;
    this.load();
  }

  get sucursal() {
    return this._sucursal;
  }
  set sucursal(val) {
    this._sucursal = val;
    this.load();
  }

  onSelect(ficha: Ficha) {
    this.service.cheques(ficha.id).subscribe(res => {
      const ref = this.dialog.open(FichaInfoComponent, {
        data: { ficha: ficha, cheques: res },
        width: '650px'
      });
    });
  }

  generar(fecha: Date) {
    const ref = this.dialog.open(GenerarFichaComponent, {
      data: { fecha: this.fechaInicial }
    });
    ref.afterClosed().subscribe(res => {
      if (res) {
        const params = { ...res };
        params.cuenta = res.cuenta.id;
        params.fecha = this.fechaInicial.toISOString();
        console.log('Generando para: ', res);
        this.service.generar(params).subscribe(data => {
          this.load();
        });
      }
    });
  }

  registrarIngreso(ficha: Ficha) {
    this.dialogService
      .openConfirm({
        title: 'Tesorería',
        message: `Registrar ingreso de ficha ${ficha.folio}?`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(val => {
        // console.log('Registrando ingreso en tesorería');
        this.service.ingreso(ficha.id).subscribe(res => {
          // console.log('Ingreso registrado: ', res);
          this.load();
        });
      });
  }
}
