import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { catchError } from 'rxjs/operators';

import { ITdDataTableColumn } from '@covalent/core';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';

@Component({
  selector: 'sx-cliente-facturas',
  templateUrl: './cliente-facturas.component.html',
  providers: [DatePipe, CurrencyPipe]
})
export class ClienteFacturasComponent implements OnInit {
  cliente$: Observable<Cliente>;
  facturas$: Observable<any>;

  columns: ITdDataTableColumn[] = [
    { name: 'sucursal', label: 'Sucursal', sortable: true, width: 120 },
    { name: 'tipo', label: 'Tipo', sortable: true, width: 60 },
    {
      name: 'documento',
      label: 'Docto',
      filter: true,
      sortable: true,
      width: 60
    },
    {
      name: 'fecha',
      label: 'Fecha',
      format: date => this.datePipe.transform(date, 'dd/MM/yyyy')
    },
    {
      name: 'total',
      label: 'Total',
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'pagos',
      label: 'Pagos',
      numeric: true,
      sortable: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    },
    {
      name: 'saldo',
      label: 'Saldo',
      sortable: true,
      numeric: true,
      filter: true,
      format: value => this.currencyPipe.transform(value, 'USD')
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private currencyPipe: CurrencyPipe,
    private service: ClienteService
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
    this.facturas$ = this.cliente$.switchMap(cliente => {
      // console.log('Buscando facturas para : ', cliente);
      return this.service
        .facturas(cliente, { term: '' })
        .pipe(catchError(err => Observable.of(err)));
    });
  }
}
