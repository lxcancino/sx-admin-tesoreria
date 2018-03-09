import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../services';
import { catchError } from 'rxjs/operators';
import { Cobro } from '../../../ingresos/models/cobro';

@Component({
  selector: 'sx-cliente-cobros',
  templateUrl: './cliente-cobros.component.html'
})
export class ClienteCobrosComponent implements OnInit {
  cliente$: Observable<Cliente>;
  cobros$: Observable<Cobro[]>;

  constructor(private route: ActivatedRoute, private service: ClienteService) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
    this.cobros$ = this.cliente$.switchMap(cliente => {
      return this.service
        .cobros(cliente, { term: '' })
        .pipe(catchError(err => Observable.of(err)));
    });
  }
}
