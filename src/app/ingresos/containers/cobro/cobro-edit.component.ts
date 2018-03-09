import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Cobro } from '../../models/cobro';
import { CobrosService } from '../../services';
import { TdDialogService } from '@covalent/core';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'sx-cobro-edit',
  template: `
    <div>
    <ng-template tdLoading [tdLoadingUntil]="!procesando" tdLoadingStrategy="overlay" >
    <ng-container *ngIf="cobro$ | async as cobro">
        <sx-cobro-form [cobro]="cobro" (delete)="onDelete($event)" (cancel)="onCancel($event)"></sx-cobro-form>
      </ng-container>
    </ng-template>

    </div>
  `
})
export class CobroEditComponent implements OnInit {
  cobro$: Observable<Cobro>;
  procesando = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CobrosService,
    private dialogServie: TdDialogService
  ) {}

  ngOnInit() {
    this.cobro$ = this.route.paramMap.switchMap(params => {
      return this.service.get(params.get('id'));
    });
  }

  onCancel() {
    this.router.navigate(['/ingresos/cobros']);
  }

  onDelete(cobro: Cobro) {
    this.dialogServie
      .openConfirm({
        title: 'Eliminar cobro?',
        message: 'Cobro por: ' + cobro.importe,
        acceptButton: 'Eliminar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.procesando = true;
          this.service
            .delete(cobro.id)
            .pipe(
              catchError(err => Observable.of(err)),
              finalize(() => (this.procesando = false))
            )
            .subscribe(data => {
              this.router.navigate(['/ingresos/cobros']);
            });
        }
      });
  }
}
