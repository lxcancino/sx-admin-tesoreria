import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Periodo } from 'app/_core/models/periodo';
import { MovimientoDeTesoreria } from '../../../models/movimientoDeTesoreria';

@Component({
  selector: 'sx-depositos-retiros',
  templateUrl: './depositos-retiros.component.html'
})
export class DepositosRetirosComponent implements OnInit {
  periodo: Periodo = Periodo.monthToDay();
  movimientos$: Observable<MovimientoDeTesoreria[]>;

  constructor() {}

  ngOnInit() {
    console.log('Periodo: ', this.periodo.toJson());
    const js = {
      fechaInicial: this.periodo.fechaInicial.toISOString(),
      fechaFinal: this.periodo.fechaFinal.toISOString()
    };
    console.log('Per as json: ', js);
  }
}
