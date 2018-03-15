import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { Periodo } from 'app/_core/models/periodo';
import { PeriodoDialogComponent } from 'app/_shared/components';
import { CorteDeTarjetaService } from '../../services';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'sx-cortes-registrados',
  templateUrl: './cortes-registrados.component.html'
})
export class CortesRegistradosComponent implements OnInit, OnDestroy {
  procesando = false;
  periodo: Periodo;
  cortes$: Observable<Array<any>>;

  constructor(
    private dialog: MatDialog,
    private service: CorteDeTarjetaService,
    private router: Router
  ) {}

  ngOnInit() {
    const json = localStorage.getItem('SX_TES_CORTES_TARJETA_PER');
    if (json) {
      this.periodo = Periodo.parse(json);
    }
    this.load();
  }

  ngOnDestroy() {
    localStorage.setItem('SX_TES_CORTES_TARJETA_PER', this.periodo.toJson());
  }

  selectPeriodo() {
    this.dialog
      .open(PeriodoDialogComponent, {
        data: { periodo: this.periodo }
      })
      .afterClosed()
      .subscribe(per => {
        if (per) {
          this.periodo = per;
        }
      });
  }

  load() {
    this.procesando = true;
    this.cortes$ = this.service
      .list({ periodo: this.periodo })
      .pipe(finalize(() => (this.procesando = false)));
  }

  onSelect(corte) {
    // console.log('Corte: ', corte);
    this.router.navigate(['cortesTarjeta', corte.id]);
  }
}
