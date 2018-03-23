import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { finalize } from 'rxjs/operators';
import { TdLoadingService } from '@covalent/core';

import { MovimientosDeTesoreriaService } from '../../services';
import { CuentaDeBanco } from 'app/models/cuentaDeBanco';
import { MovimientoDeTesoreria } from 'app/models/movimientoDeTesoreria';

@Component({
  selector: 'sx-deposito-retiro-create',
  template: `
  <div layout>
    <sx-deposito-retiro-form (save)="onSave($event)" (cancel)="onCancel()"></sx-deposito-retiro-form>
  </div>

  `
})
export class DepositoRetiroCreateComponent implements OnInit {
  cuentas$: Observable<CuentaDeBanco[]>;
  constructor(
    private service: MovimientosDeTesoreriaService,
    private loadingService: TdLoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cuentas$ = this.service.cuentas();
  }

  onSave(movimiento: MovimientoDeTesoreria) {
    // console.log('Salvando movimiento: ', movimiento);
    this.loadingService.register('');
    this.service
      .save(movimiento)
      .pipe(finalize(() => this.loadingService.resolve('')))
      .subscribe(res => {
        this.router.navigate(['movimientos/depositosRetiros']);
      });
  }

  onCancel() {
    this.router.navigate(['movimientos/depositosRetiros']);
  }
}
