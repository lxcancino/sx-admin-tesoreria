import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TdDialogService } from '@covalent/core';

import { Periodo } from 'app/_core/models/periodo';
import { MovimientoDeTesoreria } from '../../../models/movimientoDeTesoreria';
import { MovimientosDeTesoreriaService } from '../../services';

@Component({
  selector: 'sx-depositos-retiros',
  templateUrl: './depositos-retiros.component.html'
})
export class DepositosRetirosComponent implements OnInit {
  periodo: Periodo = Periodo.monthToDay();
  movimientos$: Observable<MovimientoDeTesoreria[]>;
  private localKey = 'sx.tesoreria.movimientos.depositos-retiros';

  @ViewChild('table') table;

  constructor(
    private service: MovimientosDeTesoreriaService,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    const pp = Periodo.fromJson(localStorage.getItem(this.localKey));
    if (pp !== null) {
      this.periodo = pp;
    } else {
      this.periodo = Periodo.monthToDay();
      localStorage.setItem(this.localKey, this.periodo.toJson());
    }
    this.load();
  }

  load() {
    this.movimientos$ = this.service.list({ periodo: this.periodo });
  }

  search(term: string) {
    this.table.search(term);
  }

  cambiarPeriodo(periodo: Periodo) {
    localStorage.setItem(this.localKey, periodo.toJson());
  }

  onSelect(movimiento: MovimientoDeTesoreria) {
    console.log('Seleccionando movimiento: ', movimiento);
  }

  onDelete(movimiento: MovimientoDeTesoreria) {
    this.dialogService
      .openConfirm({
        title: 'Deposito/Retiro',
        message: 'Eliminar el movimiento: ' + movimiento.folio,
        cancelButton: 'Cancelar',
        acceptButton: 'Eliminar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.service.delete(movimiento.id).subscribe(res => this.load());
        }
      });
  }
}
