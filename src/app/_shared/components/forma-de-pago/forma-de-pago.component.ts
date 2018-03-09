import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'sx-forma-de-pago',
  template: `
  <ng-container [formGroup]="parent">
    <mat-form-field>
      <mat-select placeholder="Fomra de pago" [formControlName]="propertyName" class="fill">
        <mat-option *ngFor="let tipo of tipos" [value]="tipo">
          {{tipo}}
        </mat-option>
      </mat-select>
    </mat-form-field>
  </ng-container>
  `,
  styles: [
    `
    .fill {
      width: 100%;
    }
    `]
})
export class FormaDePagoComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() propertyName = 'formaDePago';

  tipos = ['POR DEFINIR', 'EFECTIVO', 'CHEQUE', 'TRANSFERENCIA', 'TARJETA_DEBITO', 'TARJETA_CREDITO',
    'DEPOSITO_CHEQUE', 'DEPOSITO_EFECTIVO', 'DEPOSITO_MIXTO'];

  constructor() { }

  ngOnInit() {
  }

}

