import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'sx-facturas-cobradas',
  templateUrl: './facturas-cobradas.component.html'
})
export class FacturasCobradasComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<FacturasCobradasComponent>
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fecha: [new Date(), Validators.required],
      sucursal: [null, Validators.required]
    });
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    const fecha: Date = this.form.get('fecha').value;
    const res = {
      fecha: fecha.toISOString(),
      sucursal: this.form.get('sucursal').value.id
    };
    this.dialogRef.close(res);
  }
}
