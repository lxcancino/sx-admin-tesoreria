import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';
import { ClienteService } from '../../services';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'sx-cliente-cxc',
  templateUrl: './cliente-cxc.component.html'
})
export class ClienteCxcComponent implements OnInit {
  cliente$: Observable<Cliente>;

  cuentasPorCobrar$: Observable<Array<any>>;

  constructor(private route: ActivatedRoute, private service: ClienteService) {}

  load() {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
    this.cuentasPorCobrar$ = this.cliente$.switchMap(cliente => {
      return this.service
        .cxc(cliente, { term: '' })
        .pipe(catchError(err => Observable.of(err)));
    });
  }
}
