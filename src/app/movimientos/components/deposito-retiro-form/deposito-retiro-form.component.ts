import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { CuentaDeBanco } from 'app/models/cuentaDeBanco';
import { ConceptoTesoreria, CONCEPTOS } from 'app/models/movimientoDeTesoreria';

export function ValidateMovimientoImporte(control: AbstractControl) {
  if (control.value === 0.0) {
    return { importeInvalido: true };
  }
  return null;
}

@Component({
  selector: 'sx-deposito-retiro-form',
  templateUrl: './deposito-retiro-form.component.html'
})
export class DepositoRetiroFormComponent implements OnInit {
  form: FormGroup;
  @Input() cuentas: CuentaDeBanco[] = [];
  @Output() save = new EventEmitter();
  @Output() cancel = new EventEmitter();
  conceptos = CONCEPTOS;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      concepto: [null, Validators.required],
      fecha: [new Date(), Validators.required],
      cuenta: [null, Validators.required],
      importe: [0, [Validators.required, ValidateMovimientoImporte]],
      comentario: ['']
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      const fecha: Date = this.form.get('fecha').value;
      const mov = { ...this.form.value };
      mov.folio = 0;
      mov.fecha = fecha.toISOString();
      this.save.emit(mov);
    }
  }
}
