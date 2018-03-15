import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { CorteDeTarjetaService } from '../../services';
import { finalize } from 'rxjs/operators';
import { TdLoadingService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { CobroTarjetaDialogComponent } from '../../components';

@Component({
  selector: 'sx-cortes-pendientes',
  templateUrl: './cortes-pendientes.component.html'
})
export class CortesPendientesComponent implements OnInit, OnDestroy {
  grupos$: Observable<any>;
  sucursales$: Observable<string[]>;
  _fecha: Date;
  procesando = false;
  constructor(
    private service: CorteDeTarjetaService,
    private _loadingService: TdLoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const filtro =
      JSON.parse(localStorage.getItem('SX_TES_CORTES_FILTRO')) || {};
    if (filtro.fecha) {
      this.fecha = new Date(filtro.fecha);
    }
    this.load();
  }

  ngOnDestroy() {
    const filtro = { fecha: this.fecha };
    localStorage.setItem('SX_TES_CORTES_FILTRO', JSON.stringify(filtro));
  }

  load() {
    this.procesando = true;
    this.grupos$ = this.service
      .pendientes({
        fechaInicial: this.fecha.toISOString(),
        fechaFinal: this.fecha.toISOString()
      })
      .pipe(finalize(() => (this.procesando = false)));
    // this.sucursales$ = this.grupos$.map(res => _.keys(res));
  }

  get fecha() {
    return this._fecha;
  }
  set fecha(val) {
    this._fecha = val;
    this.load();
  }

  onGenerar(cobrosPorSucursal: any) {
    this.procesando = true;
    this._loadingService.register();
    this.service
      .generar(cobrosPorSucursal)
      .pipe(finalize(() => this._loadingService.resolve()))
      .subscribe(cortes => {
        console.log('Cortes de tarjeta generados: ', cortes);
        this.load();
      });
  }

  onEditCobro(cobro) {
    this.dialog
      .open(CobroTarjetaDialogComponent, {
        data: { cobro: { ...cobro } },
        width: '400px'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          cobro.cobro.importe = res.importe;
          cobro.debitoCredito = res.debitoCredito;
          cobro.visaMaster = res.visaMaster;
          this.doUpdateCobro(cobro);
        }
      });
  }

  private doUpdateCobro(cobro) {
    console.log('Salvando cobro: ', cobro);
    this.service.updateCobro(cobro).subscribe(cc => {
      this.load();
    });
  }
}
