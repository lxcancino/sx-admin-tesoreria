import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ITdDataTableColumn } from '@covalent/core';

import { Cobro } from '../../models/cobro';
import { PagosUtils } from '../../../_core/services/pagos-utils.service';

@Component({
  selector: 'sx-cobros-table',
  template: `
    <td-data-table [data]="cobros" [columns]="columns">
      <ng-template tdDataTableTemplate="tipo" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" flex>{{value}}</span>
      </ng-template>

      <ng-template tdDataTableTemplate="cliente.nombre" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" flex>{{value}}</span>
      </ng-template>

      <ng-template tdDataTableTemplate="disponible" let-value="value" let-row="row" >
        <span (click)="select.emit(row)" class="cursor-pointer" [ngClass]="{'tc-indigo-800':value > 0}" flex>
          {{value | currency: 'USD': 1.2-2}}
        </span>
      </ng-template>

      <ng-template tdDataTableTemplate="referencia" let-value="value" let-row="row" >
        <span layout="column" >
          <span>{{value}}</span>
          <span  *ngIf="row.cheque ">{{row.bancoOrigen}}</span>
        </span>
      </ng-template>

    </td-data-table>
  `,
  styles: [``],
  providers: [DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CobrosTableComponent implements OnInit {
  @Input() cobros: Cobro[] = [];
  @Output() select = new EventEmitter<Cobro>();

  columns: ITdDataTableColumn[] = [
    { name: 'tipo', label: 'Tipo', numeric: false, width: 70 },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {
      name: 'cliente.nombre',
      label: 'Cliente',
      sortable: true,
      numeric: false,
      nested: true
    },
    {
      name: 'formaDePago',
      label: 'F.Pago',
      sortable: true,
      numeric: false,
      nested: true,
      width: 100,
      format: value => this.pagosUtils.slim(value)
    },
    {
      name: 'referencia',
      label: 'Referencia',
      sortable: true,
      numeric: false,
      nested: true,
      width: 120
    },
    {
      name: 'importe',
      label: 'Importe',
      sortable: true,
      numeric: false,
      format: value => this.currencyPipe.transform(value, 'USD'),
      width: 150
    },
    {
      name: 'disponible',
      label: 'Disponible',
      sortable: true,
      numeric: false,
      format: value => this.currencyPipe.transform(value, 'USD'),
      width: 150
    }
  ];

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private pagosUtils: PagosUtils
  ) {}

  ngOnInit() {}
}
