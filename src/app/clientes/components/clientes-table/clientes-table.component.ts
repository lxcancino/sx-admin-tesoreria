import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';
import { ClientesDataSource } from '../../containers/clientes-list/clientes.datasource';

@Component({
  selector: 'sx-clientes-table',
  templateUrl: './clientes-table.component.html',
  styles: [`
    mat-row .seleted {
      background-color: aquamarine;
    }
    .hover {
      background-color: azure;
    }
    /*mat-row:nth-child(even) {
      background-color: white;
    }
    mat-row:nth-child(odd) {
      background-color: rgba(7, 56, 48, 0.04);
    }*/
  `]
})
export class ClientesTableComponent implements OnInit {

  @Input() columns = ['nombre', 'rfc', 'clave'];

  @Input() dataSource: ClientesDataSource;

  @Output() select = new EventEmitter<Cliente>(null);

  constructor() { }

  ngOnInit() {
  }

}
