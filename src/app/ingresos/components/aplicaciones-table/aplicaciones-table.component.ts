import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {
  TdDataTableSortingOrder,
  ITdDataTableColumn,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent
} from '@covalent/core';

@Component({
  selector: 'sx-aplicaciones-table',
  templateUrl: './aplicaciones-table.component.html',
  providers: [DatePipe, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AplicacionesTableComponent implements OnInit, OnChanges {
  columns: ITdDataTableColumn[] = [
    {
      name: 'cuentaPorCobrar.sucursal.nombre',
      label: 'Sucursal',
      sortable: true,
      width: 120,
      nested: true
    },

    {
      name: 'cuentaPorCobrar.tipo',
      label: 'Tipo',
      sortable: true,
      width: 90,
      nested: true
    },
    {
      name: 'cuentaPorCobrar.documento',
      label: 'Docto',
      filter: true,
      sortable: true,
      width: 90
    },
    {
      name: 'fecha',
      label: 'Fecha',
      width: 90,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'cuentaPorCobrar.total',
      label: 'Tot Dcto',
      width: 110,
      numeric: true,
      sortable: true,
      filter: true,
      nested: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'cuentaPorCobrar.saldo',
      label: 'Saldo Dcto',
      width: 110,
      numeric: true,
      sortable: true,
      filter: true,
      nested: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'importe',
      label: 'Aplicado',
      width: 110,
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  @Input() data: any[] = [];
  @Output() selection = new EventEmitter();
  @Output() reload = new EventEmitter();

  filteredData: any[] = this.data;
  filteredTotal: number = this.data.length;
  selectable = true;
  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 10;
  sortBy = 'cuentaPorCobrar.documento';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService
  ) {}

  ngOnChanges(changes) {
    if (changes.data) {
      //  console.log('Detectando cambios: ', changes);
      this.filter();
    }
  }
  ngOnInit() {
    this.filter();
  }

  selectionChange() {
    this.selection.emit(this.selectedRows);
  }

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
    let newData: any[] = this.data;
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
