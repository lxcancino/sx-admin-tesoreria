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
    // { name: 'cobro.dateCreated', label: 'Autorizado', width: 150 },
    { name: 'total', label: 'Total', width: 100 },
    { name: 'banco.nombre', label: 'Banco', width: 150 },
    // { name: 'cuenta.descripcion', label: 'Destino', width: 170 },
    // { name: 'updateUser', label: 'Usuario', width: 150 },
    { name: 'registrar', label: '', width: 160 }
  ];

  solicitudes = [];
  solicitudes$: Observable<SolicitudDeDeposito[]>;
  procesando = false;

  search$ = new BehaviorSubject<string>('');

  filter: {
    folio?: number;
    cliente?: string;
    sucursal?: string;
    total?: number;
    fechaDeposito?: string;
    banco?: string;
  } = {};

  constructor(
    private service: SolicitudService,
    private pagoUtils: PagosUtils,
    private dialogService: TdDialogService
  ) {}

  ngOnInit() {
    // this.solicitudes$.subscribe( res => this.solicitudes = res);
    this.load();
  }

  load() {
    this.procesando = true;
    this.solicitudes$ = this.service
      .autorizadas(this.filter)
      .do(term => (this.procesando = true))
      .catch(err => this.handleError(err))
      .finally(() => (this.procesando = false));
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
        // console.log('Registrando ingreso en tesorería');
        this.service.ingreso(sol.id).subscribe(res => {
          // console.log('Ingreso registrado: ', res.cobro.ingreso);
          this.load();
        });
      });
  }
}
