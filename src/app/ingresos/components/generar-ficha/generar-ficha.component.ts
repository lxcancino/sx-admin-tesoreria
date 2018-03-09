import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sx-generar-ficha',
  template: `
  <h2 mat-dialog-title>Generar ficha ({{fecha | date: 'dd/MM/yyyy'}}) </h2>
  <form [formGroup]="form" novalidate (ngSubmit)="onSubmit()">
    <mat-dialog-content>

      <mat-form-field class="pad-left">
        <mat-select placeholder="Cartera" formControlName="tipo">
          <mat-option *ngFor="let tipo of ['CRE','JUR','CHE']" [value]="tipo">
            {{tipo}}
           </mat-option>
        </mat-select>
      </mat-form-field>
      <mat-form-field class="pad-left">
        <mat-select placeholder="Cartera" formControlName="formaDePago">
          <mat-option *ngFor="let forma of ['CHEQUE','EFECTIVO']" [value]="forma">
            {{forma}}
           </mat-option>
        </mat-select>
      </mat-form-field>
      <sx-cuenta-banco-field formControlName="cuenta"></sx-cuenta-banco-field>

    </mat-dialog-content>

    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="form.value" [disabled]="form.invalid">Aceptar</button>
      <button mat-button mat-dialog-close>Cancelar</button>
    </mat-dialog-actions>
  </form>
  `
})
export class GenerarFichaComponent implements OnInit {
  fecha: any;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<GenerarFichaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fecha = data.fecha;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      tipo: ['CRE', Validators.required],
      formaDePago: ['CHEQUE', Validators.required],
      cuenta: [null, Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
