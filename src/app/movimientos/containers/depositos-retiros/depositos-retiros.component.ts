import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

  constructor(private service: MovimientosDeTesoreriaService) {}

  ngOnInit() {
    const pp = Periodo.fromJson(localStorage.getItem(this.localKey));
    if (pp !== null) {
      this.periodo = pp;
    }
    this.load();
  }

  load() {
    this.movimientos$ = this.service.list({ periodo: this.periodo });
    this.movimientos$.subscribe(data => console.log(data));
  }

  search(term: string) {}

  cambiarPeriodo(periodo: Periodo) {
    console.log('Nuevo periodo: ', periodo);
    localStorage.setItem(this.localKey, periodo.toJson());
  }
}
