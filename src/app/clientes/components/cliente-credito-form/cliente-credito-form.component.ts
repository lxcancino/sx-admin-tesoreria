import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Cliente, LineaDeCredito } from '../../models';

@Component({
  selector: 'sx-cliente-credito-form',
  templateUrl: 'cliente-credito-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteCreditoFormComponent implements OnInit {
  cliente: Cliente;
  credito: LineaDeCredito;
  form: FormGroup;
  dias: [1, 2, 3, 4, 5, 7];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log('Data: ', this.data);
    this.cliente = this.data.cliente;
    this.buildForm();
    if (this.cliente.credito) {
      this.credito = this.cliente.credito;
      this.form.patchValue(this.credito);
    }

    this.form.get('revision').valueChanges.subscribe(val => {
      if (val) {
        this.form.get('diaCobro').enable();
        this.form.get('diaRevision').enable();
      } else {
        this.form.get('diaCobro').disable();
        this.form.get('diaRevision').disable();
      }
    });
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [this.cliente.id, Validators.required],
      id: [null],
      lineaDeCredito: [0.0, Validators.required],
      plazo: [0, Validators.min(0)],
      creditoActivo: [false],
      postFechado: [false],
      atrasoMaximo: [0, Validators.required],
      descuentoFijo: [0.0, Validators.min(0.0)],
      revision: [false],
      diaCobro: [{ value: 1, disabled: true }],
      diaRevision: [{ value: 1, disabled: true }],
      venceFactura: [false]
    });
  }

  getDiaName(dia: number) {
    switch (dia) {
      case 1:
        return 'LUNES';
      case 2:
        return 'MARTES';
      case 3:
        return 'MIERCOLES';
      case 4:
        return 'JEUVES';
      case 5:
        return 'VIERNES';
      default: {
        return 'NO APLICA';
      }
    }
  }
}
