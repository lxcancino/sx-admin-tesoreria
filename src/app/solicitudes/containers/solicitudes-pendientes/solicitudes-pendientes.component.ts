import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { AutorizacionFormComponent } from '../../components';
import { SolicitudService } from '../../services/solicitud.service';
import { TdLoadingService } from '@covalent/core';
import { finalize, delay, catchError, takeUntil } from 'rxjs/operators';

import { SolicitudDeDeposito } from '../../models';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'sx-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html',
  styles: [
    `
    .sols-panel {
      overflow-x: scroll;
      width: 100%;
      height: 100%;
    }
  `
  ]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudesPendientesComponent implements OnInit, OnDestroy {
  pendientes = [];
  private _watch = true;
  _dialogOpened = false;
  term = '';
  reload$ = new Subject<boolean>();

  destroy$ = new Subject<boolean>();

  @ViewChild('table') table;

  constructor(
    private service: SolicitudService,
    private dialog: MatDialog,
    private _loadingService: TdLoadingService
  ) {
    this.reload$
      .takeUntil(this.destroy$)
      .subscribe(val => console.log('Iniciar reloading ', val));
  }

  ngOnInit() {
    this.load();
  }

  ngOnDestroy() {
    this.watch = false;
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  load() {
    this._loadingService.register('loading');
    this.service
      .pendientes({ term: this.term })
      .pipe(
        finalize(() => this._loadingService.resolve('loading')),
        takeUntil(this.destroy$)
      )
      .subscribe(res => {
        this.pendientes = res;
        // this.table.refresh();
        this.autorizarNext();
      });
  }

  onSearch(term) {
    this.term = term;
    this.load();
  }

  autorizarNext() {
    setTimeout(() => {
      if (this.pendientes.length > 0 && this.watch && !this._dialogOpened) {
        this.autorizar(this.pendientes[0], 0);
      } else if (this.watch && !this._dialogOpened) {
        this.load();
      }
    }, 4000);
  }

  onSelect(solicitud) {
    const index = _.findIndex(
      this.pendientes,
      item => item.id === solicitud.id
    );
    if (index !== -1) {
      this.autorizar(solicitud, index);
    }
  }

  autorizar(sol: SolicitudDeDeposito, index: number) {
    this.service.buscarDupicada(sol.id).subscribe(val => {
      if (val.folio) {
        this.doAutorizar(sol, index, val);
      } else {
        this.doAutorizar(sol, index);
      }
    });
  }

  doAutorizar(
    sol: SolicitudDeDeposito,
    index: number,
    duplicada: SolicitudDeDeposito = null
  ) {
    const dialogRef = this.dialog.open(AutorizacionFormComponent, {
      width: '700px',
      data: { solicitud: sol, duplicada: duplicada }
    });
    dialogRef.afterOpen().subscribe(() => (this._dialogOpened = true));
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        if (val.posponer) {
          this.service.posponer(sol).subscribe(res => {
            // console.log('Solicitud pospuesta: ', res);
            const data = [...this.pendientes];
            data.splice(index, 1);
            this.pendientes = data;
          });
        } else if (val.autorizar === true) {
          // console.log(' Autorizando: ', sol);
          this.service.autorizar(sol).subscribe(res => {
            const data = [...this.pendientes];
            data.splice(index, 1);
            this.pendientes = data;
          });
        } else if (val.autorizar === false) {
          // console.log(' Rechazar: ', sol);
          this.service.rechazar(sol, val.comentario).subscribe(res => {
            const data = [...this.pendientes];
            data.splice(index, 1);
            this.pendientes = data;
          });
        } else if (val.cancelar === true) {
          // console.log(' Cancelar: ', sol);
          this.service.cancelar(sol, val.comentario).subscribe(res => {
            const data = [...this.pendientes];
            data.splice(index, 1);
            this.pendientes = data;
          });
        }
      }
      this._dialogOpened = false;
      this.autorizarNext();
    });
  }

  set watch(val) {
    this._watch = val;
    this.autorizarNext();
  }

  get watch() {
    return this._watch;
  }
}
