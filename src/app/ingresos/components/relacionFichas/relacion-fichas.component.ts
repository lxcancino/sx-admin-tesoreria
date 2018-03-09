import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'sx-relacion-fichas',
  template: `
  <h2 mat-dialog-title>Relación de fichas </h2>
  <form [formGroup]="form" novalidate >
    <mat-dialog-content layout="column">

      <mat-form-field class="pad-left">
        <input matInput [matDatepicker]="myDatepicker" formControlName="fecha">
        <mat-datepicker-toggle matSuffix [for]="myDatepicker"></mat-datepicker-toggle>
        <mat-datepicker #myDatepicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field class="pad-left">
        <mat-select placeholder="Cartera" formControlName="origen">
          <mat-option *ngFor="let tipo of ['CRE','JUR','CHE']" [value]="tipo">
            {{tipo}}
           </mat-option>
        </mat-select>
      </mat-form-field>

    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="params()" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close>Cancelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class RelacionFichasComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<RelacionFichasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildForm();
    // if (data.fecha) {
    //   this.form.get('fecha').setValue(data.fecha);
    // }
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      origen: ['CRE', Validators.required]
    });
  }

  ngOnInit() {}

  params() {
    if (this.form.valid) {
      const fecha: Date = this.form.get('fecha').value;
      const params = { ...this.form.value };
      params.fecha = fecha.toISOString();
      return params;
    }
  }
}
