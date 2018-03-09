import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { SolicitudFormComponent } from '../../components';
import { SolicitudService } from '../../services/solicitud.service';
import { TdLoadingService } from '@covalent/core';
import { finalize, delay, catchError } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { Periodo } from 'app/_core/models/periodo';
import { PeriodoDialogComponent } from '../../../_shared/components';

@Component({
  selector: 'sx-solicitudes-autorizadas',
  templateUrl: './solicitudes-autorizadas.component.html'
})
export class SolicitudesAutorizadasComponent implements OnInit {
  solicitudes$: Observable<Array<any>>;
  term = '';
  periodo = new Periodo();
  constructor(
    private service: SolicitudService,
    private _loadingService: TdLoadingService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this._loadingService.register('loading');
    this.solicitudes$ = this.service
      .autorizadas({ term: this.term, cartera: 'CRE' }, this.periodo)
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

  cambiarPeriodo() {
    this.dialog
      .open(PeriodoDialogComponent, {
        data: { periodo: this.periodo }
      })
      .afterClosed()
      .subscribe(newPeriodo => {
        if (newPeriodo) {
          this.periodo = newPeriodo;
          this.load();
        }
      });
  }
}
