import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewChild,
  OnChanges
} from '@angular/core';
import {
  ITdDataTableColumn,
  TdDataTableColumnComponent,
  TdDataTableComponent
} from '@covalent/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'sx-solicitudes-pendientes-table',
  templateUrl: './solicitudes-pendientes-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SolicitudesPendientesTableComponent implements OnInit, OnChanges {
  @Input() solicitudes: any[];
  @Output() select = new EventEmitter();
  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', sortable: true, numeric: true, width: 70 },
    {
      name: 'sucursal.nombre',
      label: 'Sucursal',
      sortable: true,
      filter: true,
      width: 140
    },
    {
      name: 'fecha',
      label: 'Fecha',
      numeric: false,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {
      name: 'fechaDeposito',
      label: 'Fecha Dep',
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {
      name: 'referencia',
      label: 'Ref',
      width: 90
    },
    {
      name: 'cliente.nombre',
      label: 'Cliente',
      nested: true,
      width: 300
    },
    {
      name: 'total',
      label: 'Total',
      format: value => this.currencyPipe.transform(value, 'USD'),
      width: 120
    },
    { name: 'edit', label: 'Atender' }
  ];

  @ViewChild(TdDataTableComponent) dataTable: TdDataTableComponent;

  constructor(private datePipe: DatePipe, private currencyPipe: CurrencyPipe) {}

  ngOnInit() {}

  ngOnChanges(changes) {
    // console.log('Changes: ', changes);
  }

  refresh() {
    this.dataTable.refresh();
  }
}
