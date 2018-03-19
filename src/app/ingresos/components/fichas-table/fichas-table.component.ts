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
import {
  ITdDataTableColumn,
  TdDataTableSortingOrder,
  TdDataTableService,
  IPageChangeEvent,
  ITdDataTableSortChangeEvent
} from '@covalent/core';

import { Ficha } from '../../models/ficha';

@Component({
  selector: 'sx-fichas-table',
  template: `
    <td-data-table [data]="filteredData" [columns]="columns" sortable="true" [sortBy]="sortBy"
     [sortOrder]="sortOrder" (sortChange)="sort($event)">
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
export class FichasTableComponent implements OnInit, OnChanges {
  columns: ITdDataTableColumn[] = [
    { name: 'origen', label: 'Tipo', width: 70 },
    {
      name: 'sucursalNombre',
      label: 'Sucursal',
      sortable: true,
      filter: true,
      nested: true,
      numeric: false,
      width: 130
    },
    {
      name: 'folio',
      label: 'Folio',
      numeric: true,
      filter: true,
      sortable: true,
      width: 100
    },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      width: 90
    },
    {
      name: 'tipoDeFicha',
      label: 'Tipo',
      sortable: false,
      numeric: false,
      nested: true,
      width: 150
    },
    {
      name: 'cuentaDeBanco.descripcion',
      label: 'Cuenta',
      sortable: false,
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

  @Input() fichas: Ficha[] = [];
  @Output() select = new EventEmitter<Ficha>();
  @Output() ingreso = new EventEmitter<Ficha>();

  filteredData: any[] = this.fichas;
  filteredTotal: number = this.fichas.length;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 100;
  sortBy = '';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private _dataTableService: TdDataTableService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.fichas) {
      if (this.fichas) {
        this.filter();
      }
    }
  }

  ngOnInit() {}

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }
  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.fichas;
    const excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(
      newData,
      this.searchTerm,
      true,
      excludedColumns
    );
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(
      newData,
      this.sortBy,
      this.sortOrder
    );
    newData = this._dataTableService.pageData(
      newData,
      this.fromRow,
      this.currentPage * this.pageSize
    );
    this.filteredData = newData;
  }
}
