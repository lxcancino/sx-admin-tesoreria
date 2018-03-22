import { Component, OnInit } from '@angular/core';
import { ITdDataTableColumn, TdDialogService } from '@covalent/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

import { SolicitudDeDeposito } from '../../models';
import { SolicitudService } from '../../services';
import { PagosUtils } from 'app/_core/services/pagos-utils.service';

@Component({
  selector: 'sx-solicitudes-autorizadas',
  templateUrl: './solicitudes-autorizadas.component.html',
  styles: [
    `
    .filter-panel {
      overflow-x: auto;
    }
    .table-panel {
      overflow: auto;
      height: 500px;
      width: 100%;
    }
  `
  ]
})
export class SolicitudesAutorizadasComponent implements OnInit {
  columns: ITdDataTableColumn[] = [
    { name: 'folio', label: 'Folio', width: 70 },
    { name: 'sucursal', label: 'Sucursal', width: 120 },
    { name: 'cliente.nombre', label: 'Cliente', width: 300 },
    { name: 'fechaDeposito', label: 'Fecha D', width: 100 },
    { name: 'cobro.formaDePago', label: 'F.P', width: 150 },
    { name: 'total', label: 'Total', width: 100 },
    { name: 'banco.nombre', label: 'Banco', width: 150 },
    { name: 'fechaCobranza', label: 'Fecha Cob', width: 100 },
    { name: 'registrar', label: '', width: 160 }
  ];

  selectedRows: any[] = [];

  solicitudes = [];
  solicitudes$: Observable<SolicitudDeDeposito[]>;
  totalTransferencia$: Observable<number>;
  totalCheque$: Observable<number>;
  totalEfectivo$: Observable<number>;
  procesando = false;

  search$ = new BehaviorSubject<string>('');

  filter: {
    folio?: number;
    cliente?: string;
    sucursal?: string;
    total?: number;
    fechaDeposito?: string;
    fechaCobranza?: string;
    banco?: string;
  } = {};

  constructor(
    private service: SolicitudService,
    private pagoUtils: PagosUtils,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    this.load();
    // this.solicitudes$.subscribe(res => console.log(res));
  }

  load() {
    this.procesando = true;
    this.solicitudes$ = this.service
      .autorizadas(this.filter)
      .do(term => (this.procesando = true))
      .catch(err => this.handleError(err))
      .finally(() => (this.procesando = false));
    this.totalTransferencia$ = this.solicitudes$.map((data: Array<any>) => {
      return _.sumBy(data, item => {
        if (item.cobro.formaDePago === 'TRANSFERENCIA') {
          return item.total;
        } else {
          return 0;
        }
      });
    });

    this.totalCheque$ = this.solicitudes$.map((data: Array<any>) => {
      return _.sumBy(data, item => {
        if (item.cheque > 0) {
          return item.cheque;
        } else {
          return 0;
        }
      });
    });

    this.totalEfectivo$ = this.solicitudes$.map((data: Array<any>) => {
      return _.sumBy(data, item => {
        if (item.efectivo > 0) {
          return item.efectivo;
        } else {
          return 0;
        }
      });
    });
  }

  selectionChange() {
    console.log('Selection: ', this.selectedRows);
  }

  search(data) {}

  searchFolio(folio) {
    this.filter.folio = folio;
    this.load();
  }
  searchTotal(total) {
    this.filter.total = total;
    this.load();
  }
  searchCliente(cliente) {
    this.filter.cliente = cliente;
    this.load();
  }
  searchSucursal(sucursal) {
    this.filter.sucursal = sucursal;
    this.load();
  }
  searchFecha(fecha: Date) {
    if (fecha !== null && _.isDate(fecha)) {
      this.filter.fechaDeposito = fecha.toISOString();
    } else {
      this.filter.fechaDeposito = null;
    }
    this.load();
  }
  searchFechaCobranza(fecha: Date) {
    if (fecha !== null && _.isDate(fecha)) {
      this.filter.fechaCobranza = fecha.toISOString();
    } else {
      this.filter.fechaCobranza = null;
    }
    this.load();
  }
  searchBanco(banco) {
    this.filter.banco = banco;
    this.load();
  }

  handleError(err) {
    console.error('Error: ', err);
    return Observable.of(err);
  }

  getFormaDePago(formaDePago) {
    return this.pagoUtils.slim(formaDePago);
  }

  registrarBatch() {
    const sols = this.selectedRows.filter(row => row.cobro.ingreso === null);
    if (sols.length > 0) {
      console.log('Registrando ingreso de :', sols);
    }
  }

  registrarIngreso(sol: SolicitudDeDeposito) {
    this.dialogService
      .openConfirm({
        title: 'Tesorería',
        message: `Registrar ingreso de depósito ${sol.folio}?`,
        acceptButton: 'Aceptar',
        cancelButton: 'Cancelar'
      })
      .afterClosed()
      .subscribe(val => {
        this.service.ingreso(sol.id).subscribe(res => {
          this.load();
        });
      });
  }
}
