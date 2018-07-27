import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, combineLatest } from 'rxjs/operators';

import { ChequesDevueltosService } from '../../services/cheques-devueltos.service';
import { ChequeDevuelto } from '../../models/chequeDevuelto';
import { FechaDialogComponent } from '../../../_shared/components';

import * as _ from 'lodash';

@Component({
  selector: 'sx-cheques-devueltos',
  template: `
    <mat-card>
      <sx-search-title title="Cheques devueltos" (search)="term = $event">
        <mat-checkbox [checked]="pendientes$ | async" class="options" (change)="setPendientes($event)">Pendientes</mat-checkbox>
        <button mat-menu-item class="actions" (click)="runReport()">
          <mat-icon>picture_as_pdf</mat-icon> Reporte de cheques
        </button>
      </sx-search-title>
      <mat-divider></mat-divider>
      <div class="table-panel">
        <sx-cheque-devueltos-table [cheques]="cheques$ | async" (recepcion)="onRecepcion($event)"
        [searchTerm]="term">
        </sx-cheque-devueltos-table>
      </div>
    </mat-card>
  `
})
export class ChequesDevueltosComponent implements OnInit {
  cheques$: Observable<ChequeDevuelto[]>;
  term;
  pendientes = true;
  pendientes$ = new BehaviorSubject<boolean>(true);

  constructor(
    private service: ChequesDevueltosService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.cheques$ = this.service.list({}).pipe(
      combineLatest(this.pendientes$, (cheques, pendiente) => {
        if (pendiente) {
          return cheques.filter(item => !item.recepcion);
        } else {
          return cheques;
        }
      })
    );
  }

  onRecepcion(event: ChequeDevuelto) {
    this.dialog
      .open(FechaDialogComponent, { data: { title: 'Recepción' } })
      .afterClosed()
      .subscribe((fecha: Date) => {
        if (fecha) {
          event.recepcion = fecha.toISOString();
          this.service
            .update(event)
            .pipe(catchError(err => Observable.of(console.error(err))))
            .subscribe(res => {
              this.load();
            });
        }
      });
  }

  runReport() {
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: { title: 'Reporte de cheques devueltos' }
    });
    dialogRef.afterClosed().subscribe((fecha: Date) => {
      if (fecha) {
        this.service.reporteDeChequesDevueltos(fecha).subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
  }

  setPendientes(event) {
    this.pendientes$.next(event.checked);
  }
}
