import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromStore from '../../store';
import { ClientesDataSource } from './clientes.datasource';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models';

@Component({
  selector: 'sx-clientes-list',
  templateUrl: './clientes-list.component.html',
  styles: [
    `
    .page {
      /* background-color: antiquewhite; */
      height: 100%;
    }
    .spinner-container {
      height: 360px;
      width: 390px;
      position: fixed;
    }
    .spinner-container mat-spinner {
      margin: 130px auto 0 auto;
    }
  `
  ]
})
export class ClientesListComponent implements OnInit, OnDestroy {
  columns = ['clave', 'nombre', 'rfc'];
  dataSource: ClientesDataSource;

  selected: Cliente;

  filter: { term: string } = { term: '' };

  key = 'CXC_CLIENTES_FILTER';

  constructor(
    private service: ClienteService,
    private router: Router,
    private store: Store<fromStore.ClientesState>
  ) {
    this.dataSource = new ClientesDataSource(this.service);
  }

  ngOnInit() {
    this.filter = JSON.parse(localStorage.getItem(this.key)) || { term: '' };
    this.load();
  }

  ngOnDestroy() {
    localStorage.setItem(this.key, JSON.stringify(this.filter));
  }

  onSelect(cliente: Cliente) {
    this.selected = cliente;
    this.router.navigate(['clientes', cliente.id]);
  }

  onSearch(term) {
    this.filter.term = term;
    this.load();
  }

  load() {
    this.dataSource.loadClientes(this.filter.term);
  }
}
