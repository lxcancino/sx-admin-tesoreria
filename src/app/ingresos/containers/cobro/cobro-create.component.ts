import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';

@Component({
  selector: 'sx-cobro-create',
  template: `
    <div >
      <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" >
      <sx-cobro-form (cancel)="onCancel()" (save)="onSave($event)"></sx-cobro-form>
      </ng-template>
    </div>
  `
})
export class CobroCreateComponent implements OnInit {
  procesando = false;
  constructor(private router: Router, private service: CobrosService) {}

  ngOnInit() {}

  onCancel() {
    this.router.navigate(['/ingresos/cobros']);
  }

  onSave(cobro: Cobro) {
    // console.log('Salvando cobro....', cobro);

    this.procesando = true;
    this.service
      .save(cobro)
      .pipe(
        catchError(err => of(err)),
        finalize(() => (this.procesando = false))
      )
      .subscribe(res => this.router.navigate(['/ingresos/cobros']));
  }
}
