import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {
  ITdDataTableColumn,
  ITdDataTableSortChangeEvent,
  TdDataTableSortingOrder,
  TdDataTableService
} from '@covalent/core';

import { Cobro } from '../../models/cobro';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

@Component({
  selector: 'sx-cobros-table',
  template: `
    <td-data-table [data]="filteredData" [columns]="columns" [selectable]="true" [style.height.px]="500"
    [sortable]="true" (sortChange)="sort($event)">
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
      <ng-template tdDataTableTemplate="comentario" let-value="value" let-row="row" >
        <span layout="column" class="text-md">
          <span *ngIf="value">{{value}}</span>
          <span >{{row.sucursal.nombre}}</span>
        </span>
      </ng-template>

      <ng-template tdDataTableTemplate="referencia" let-value="value" let-row="row" >
        <span layout="column" >
          <span  *ngIf="row.cheque " class="text-md">{{row.bancoOrigen}}</span>

          <span>{{value}}</span>
        </span>
      </ng-template>

    </td-data-table>
  `,
  styles: [``],
  providers: [DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CobrosTableComponent implements OnInit, OnChanges {
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
      name: 'comentario',
      label: 'Comentario',
      width: 250
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

  @Input() cobros: Cobro[] = [];
  @Output() select = new EventEmitter<Cobro>();

  filteredData = this.cobros;
  sortBy = '';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private pagosUtils: PagosUtils,
    private _dataTableService: TdDataTableService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cobros && changes.cobros.currentValue) {
      this.filteredData = changes.cobros.currentValue;
      this.filter();
    }
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }
  filter() {
    let newData: any[] = this.cobros;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
    this.filteredData = newData;
  }
}
