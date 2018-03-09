import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CobroCheque } from '../../models/cobro';

@Component({
  selector: 'sx-cobrocheque-form',
  templateUrl: './cobrocheque-form.component.html',
  styles: []
})
export class CobrochequeFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CobrochequeFormComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      numero: [null, Validators.required],
      bancoOrigen: [null, Validators.required],
      numeroDeCuenta: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const cheque: CobroCheque = {
        ...this.form.value
      };
      this.dialogRef.close(cheque);
    }
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
