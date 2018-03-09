import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { SolicitudFormComponent } from '../../components';
import { SolicitudService } from '../../services/solicitud.service';
import { TdLoadingService } from '@covalent/core';
import { finalize, delay, catchError } from 'rxjs/operators';

@Component({
  selector: 'sx-solicitudes-pendientes',
  templateUrl: './solicitudes-pendientes.component.html'
})
export class SolicitudesPendientesComponent implements OnInit {
  solicitudes$: Observable<Array<any>>;
  term = '';
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
    this.solicitudes$ = this.service
      .list({ pendientes: true, cartera: 'CRE' })
      .pipe(
        finalize(() => this._loadingService.resolve('loading')),
        catchError(err => this.handleError(err))
      );
  }

  onSearch(term) {
    this.term = term;
    this.load();
  }

  handleError(error) {
    console.error(error);
    return Observable.of([]);
  }

  insert() {
    const dialogRef = this.dialog.open(SolicitudFormComponent, {
      width: '650px',
      data: { solicitud: null }
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log('Salvando solicitud de deposito: ', val);
        this._loadingService.register('loading');
        this.service
          .save(val)
          .pipe(
            finalize(() => this._loadingService.resolve('loading')),
            catchError(err => this.handleError(err))
          )
          .subscribe(res => {
            this.load();
          });
      }
    });
  }

  onSelect(solicitud) {
    const dialogRef = this.dialog.open(SolicitudFormComponent, {
      width: '650px',
      data: { solicitud: solicitud }
    });

    dialogRef.afterClosed().subscribe(val => {
      if (val) {
        console.log('Actualizando solicitud : ', val);
        this._loadingService.register('loading');
        this.service
          .update(val)
          .pipe(
            finalize(() => this._loadingService.resolve('loading')),
            catchError(err => this.handleError(err))
          )
          .subscribe(res => {
            this.load();
          });
      }
    });
  }
}
