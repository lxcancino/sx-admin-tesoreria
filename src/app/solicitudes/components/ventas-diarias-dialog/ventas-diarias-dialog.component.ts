import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sx-ventas-diarias-dialog',
  templateUrl: './ventas-diarias-dialog.component.html'
})
export class VentasDiariasDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<VentasDiariasDialogComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      sucursal: [null, Validators.required],
      origen: ['CRE', Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      fecha: fecha.toISOString(),
      sucursal: this.form.get('sucursal').value.id,
      origen: this.form.get('origen').value
    };
    if (res.origen === 'TODAS') {
      res.origen = '%';
    }
    this.dialogRef.close(res);
  }
}
