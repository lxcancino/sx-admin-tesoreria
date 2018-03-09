import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';

import { Ficha } from '../../models/ficha';

@Component({
  selector: 'sx-fichas-table',
  template: `
    <td-data-table [data]="fichas" [columns]="columns">
      <ng-template tdDataTableTemplate="tipo" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" flex>{{value}}</span>
      </ng-template>

      <ng-template tdDataTableTemplate="folio" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" flex>{{value}}</span>
      </ng-template>

      <ng-template tdDataTableTemplate="total" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" [ngClass]="{'tc-indigo-800':value > 0}" flex>
          {{value | currency: 'USD': 1.2-2}}
        </span>
      </ng-template>
      <ng-template tdDataTableTemplate="fecha" let-value="value" let-row="row" >
        {{value | date: 'dd/MM/yyyy'}}
      </ng-template>
      <ng-template tdDataTableTemplate="ingreso" let-value="value" let-row="row" >
        <button mat-button (click)="ingreso.emit(row)" *ngIf="!row.ingreso">Registrar </button>
        <mat-icon class="tc-green-800" *ngIf="row.ingreso">check</mat-icon>
      </ng-template>

    </td-data-table>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FichasTableComponent implements OnInit {
  @Input() fichas: Ficha[] = [];
  @Output() select = new EventEmitter<Ficha>();
  @Output() ingreso = new EventEmitter<Ficha>();

  columns: ITdDataTableColumn[] = [
    { name: 'origen', label: 'Tipo', numeric: false, width: 70 },
    { name: 'folio', label: 'Folio', numeric: false, width: 100 },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      width: 90
    },
    {
      name: 'tipoDeFicha',
      label: 'Tipo',
      sortable: true,
      numeric: false,
      nested: true,
      width: 150
    },
    {
      name: 'cuentaDeBanco.descripcion',
      label: 'Cuenta',
      sortable: true,
      numeric: false,
      nested: true,
      width: 200
    },
    {
      name: 'total',
      label: 'Total',
      sortable: true,
      numeric: false,
      width: 150
    },
    {
      name: 'ingreso',
      label: 'Ingreso'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
