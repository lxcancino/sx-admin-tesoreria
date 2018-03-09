import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ITdDataTableColumn } from '@covalent/core';
import { DatePipe, CurrencyPipe } from '@angular/common';

import { SolicitudService } from '../../services/solicitud.service';

@Component({
  selector: 'sx-solicitudes-table',
  templateUrl: 'solicitudes-table.component.html'
})
export class SolicitudesTableComponent implements OnInit {
  @Input() solicitudes: Array<any>;
  @Output() select = new EventEmitter();
  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', sortable: true, numeric: true, width: 70 },
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
      numeric: false,
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy'),
      width: 90
    },
    {
      name: 'referencia',
      label: 'Ref',
      numeric: false,
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
      name: 'total',
      label: 'Total',
      sortable: true,
      numeric: false,
      format: value => this.currencyPipe.transform(value, 'USD'),
      width: 100
    },
    {
      name: 'comentario',
      label: 'Comentario',
      width: 200
    }
  ];
  constructor(
    private service: SolicitudService,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe
  ) {}

  ngOnInit() {}
}
