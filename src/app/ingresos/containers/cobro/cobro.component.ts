import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { TdDialogService, TdLoadingService } from '@covalent/core';

@Component({
  selector: 'sx-cobro',
  templateUrl: './cobro.component.html',
  styles: [
    `
    .fill-space {
      flex: 1 1 auto;
    }
  `
  ]
})
export class CobroComponent implements OnInit {
  cobro: Cobro;
  pendientes$: Observable<Array<any>>;
  selectedCuentasPorPagar = <any>[];

  constructor(
    private route: ActivatedRoute,
    private service: CobrosService,
    private dialogService: TdDialogService,
    private loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.cobro = this.route.snapshot.data.cobro;
    console.log('Administracion de cobro: ', this.cobro);
    this.cargarPendientes();
  }

  reload() {
    this.service
      .get(this.cobro.id)
      .pipe(catchError(err => Observable.of(err)))
      .subscribe(res => (this.cobro = res));
    this.cargarPendientes();
  }

  cargarPendientes() {
    this.selectedCuentasPorPagar = [];
    this.pendientes$ = this.service
      .cuentasPorCobrar(this.cobro.cliente)
      .pipe(catchError(err => Observable.of(err)));
  }

  onSelection(rows) {
    this.selectedCuentasPorPagar = rows;
  }

  get porAplicar() {
    const saldoTotal = _.sumBy(
      this.selectedCuentasPorPagar,
      (item: any) => item.saldo
    );
    return saldoTotal <= this.cobro.disponible
      ? saldoTotal
      : this.cobro.disponible;
  }

  aplicar() {
    if (this.porAplicar > 0) {
      this.dialogService
        .openConfirm({
          title: 'Aplicar pago',
          message: `Se aplicara el abono de ${this.porAplicar} a ${
            this.selectedCuentasPorPagar.length
          } facturas`,
          acceptButton: 'Aplicar',
          cancelButton: 'Cancelar'
        })
        .afterClosed()
        .subscribe(res => {
          if (res) {
            this.doAplicarSeleccion();
          }
        });
    }
  }

  doAplicarSeleccion() {
    this.loadingService.register('saving');
    const pago = { ...this.cobro };
    pago.pendientesDeAplicar = this.selectedCuentasPorPagar.map((item: any) => {
      return { id: item.id };
    });
    this.service
      .update(pago)
      .pipe(
        finalize(() => this.loadingService.resolve('saving')),
        catchError(err => Observable.of(err))
      )
      .subscribe(res => {
        // console.log('Res: ', res);
        this.reload();
      });
  }
}
