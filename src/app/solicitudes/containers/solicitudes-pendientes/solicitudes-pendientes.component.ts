import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import * as _ from 'lodash';

import { AutorizacionFormComponent } from '../../components';
import { SolicitudService } from '../../services/solicitud.service';
import { TdLoadingService } from '@covalent/core';
import { finalize, delay, catchError } from 'rxjs/operators';

import { SolicitudDeDeposito } from '../../models';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudesPendientesComponent implements OnInit {
  pendientes = [];
  _atendiendo = false;
  term = '';

  @ViewChild('table') table;

  constructor(
    private service: SolicitudService,
    private dialog: MatDialog,
    private _loadingService: TdLoadingService
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this._loadingService.register('loading');
    this.service
      .pendientes({ term: this.term })
      .pipe(
        finalize(() => this._loadingService.resolve('loading')),
        catchError(err => this.handleError(err))
      )
      .subscribe(res => (this.pendientes = res));
  }

  onSearch(term) {
    this.term = term;
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
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
    dialogRef.afterOpen().subscribe(() => (this._atendiendo = true));
    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        if (val.posponer) {
          this.service.posponer(sol).subscribe(res => {
            console.log('Solicitud pospuesta: ', res);
            this.pendientes.splice(index, 1);
            this.table.refresh();
          });
        } else if (val.autorizar === true) {
          console.log(' Autorizando: ', sol);
          this.service.autorizar(sol).subscribe(res => {
            this.pendientes.splice(index, 1);
            // this.list.refresh();
          });
        } else if (val.autorizar === false) {
          console.log(' Rechazar: ', sol);
          this.service.rechazar(sol, val.comentario).subscribe(res => {
            this.pendientes.splice(index, 1);
            // this.list.refresh();
          });
        } else if (val.cancelar === true) {
          console.log(' Cancelar: ', sol);
          this.service.cancelar(sol, val.comentario).subscribe(res => {
            this.pendientes.splice(index, 1);
            // this.list.refresh();
          });
        }
      }
      this._atendiendo = false;
      // this.autorizarNext();
    });
  }
}
