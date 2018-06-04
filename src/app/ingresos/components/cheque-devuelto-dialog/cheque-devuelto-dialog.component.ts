import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'sx-cheque-devuelto-dialog',
  template: `
    <h2 mat-dialog-title>Registro de cheque devuelto</h2>
    <mat-dialog-content>
      <mat-form-field >
        <input matInput [matDatepicker]="myDatepicker" placeholder="Fecha inicial" [formControl]="control">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker></mat-datepicker>
      </mat-form-field>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="control.value" [disabled]="control.invalid">Aceptar</button>
    </mat-dialog-actions>
  `
})
export class ChequeDevueltoDialogComponent implements OnInit {
  control = new FormControl(new Date(), [Validators.required]);
  constructor() {}

  ngOnInit() {}
}
