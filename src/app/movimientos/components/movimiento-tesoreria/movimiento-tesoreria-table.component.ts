import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ViewChild,
  SimpleChanges
} from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import {
  TdDataTableSortingOrder,
  ITdDataTableColumn,
  TdDataTableService,
  ITdDataTableSortChangeEvent,
  IPageChangeEvent,
  TdDataTableComponent
} from '@covalent/core';

@Component({
  selector: 'sx-movimiento-tesoreria-table',
  templateUrl: './movimiento-tesoreria-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovimientoTesoreriaTableComponent implements OnInit, OnChanges {
  columns: ITdDataTableColumn[] = [
    {
      name: 'folio',
      label: 'Folio',
      numeric: true,
      filter: true,
      sortable: true,
      width: 60
    },
    {
      name: 'fecha',
      label: 'Fecha',
      width: 120,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'concepto',
      label: 'Concepto',
      sortable: true,
      filter: true,
      width: 120
    },
    {
      name: 'importe',
      label: 'Importe',
      numeric: true,
      sortable: true,
      filter: true,
      width: 150,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'banco',
      label: 'Cuenta',
      numeric: false,
      sortable: true,
      filter: true,
      width: 450
      // format: value => value.descripcion
    },
    {
      name: 'delete',
      label: '',
      width: 100
    }
  ];

  @Input() data: any[] = [];
  @Output() selection = new EventEmitter();
  @Output() select = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() selectable = false;

  @ViewChild(TdDataTableComponent) table;

  filteredData: any[] = [];
  filteredTotal = 0;

  searchTerm = '';
  fromRow = 1;
  currentPage = 1;
  pageSize = 10;
  sortBy = 'folio';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private _dataTableService: TdDataTableService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.data.currentValue !== null) {
      this.filter();
    }
  }

  ngOnInit() {}

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
    if (this.data === null) {
      return;
    }

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
    this.table.refresh();
  }
}
