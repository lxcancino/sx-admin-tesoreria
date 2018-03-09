import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FichasService } from '../../services';
import { Ficha } from '../../models/ficha';
import { finalize } from 'rxjs/operators';
import { TdDialogService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { GenerarFichaComponent, FichaInfoComponent } from '../../components';
import * as moment from 'moment';

@Component({
  selector: 'sx-fichas',
  templateUrl: './fichas.component.html'
})
export class FichasComponent implements OnInit, OnDestroy {
  fichas$: Observable<Ficha[]>;
  _fechaInicial = new Date();
  procesando = false;
  constructor(
    private service: FichasService,
    private dialog: MatDialog,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    const filter = JSON.parse(localStorage.getItem('SX_TES_FICHAS_FILTER'));
    if (filter) {
      // console.log('Filter: ', filter);
      // console.log('Fecha: ', moment(filter.fechaInicial).toDate());
      this.fechaInicial = moment(filter.fechaInicial).toDate();
    } else {
      this.load();
    }
  }

  ngOnDestroy() {
    const filter = { fechaInicial: this.fechaInicial };
    localStorage.setItem('SX_TES_FICHAS_FILTER', JSON.stringify(filter));
  }

  load() {
    this.procesando = true;
    this.fichas$ = this.service
      .list({ fecha: this.fechaInicial.toISOString() })
      .pipe(finalize(() => (this.procesando = false)));
  }

  get fechaInicial() {
    return this._fechaInicial;
  }
  set fechaInicial(val) {
    this._fechaInicial = val;
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
