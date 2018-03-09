import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CobroTarjeta } from '../../models/cobro';

@Component({
  selector: 'sx-cobrotarjeta-form',
  templateUrl: './cobrotarjeta-form.component.html',
  styles: []
})
export class CobrotarjetaFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CobrotarjetaFormComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      visaMaster: [true, Validators.required],
      validacion: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const tarjeta: CobroTarjeta = {
        debitoCredito: false,
        visaMaster: this.form.get('visaMaster').value as boolean,
        validacion: this.form.get('validacion').value
      };
      this.dialogRef.close(tarjeta);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
