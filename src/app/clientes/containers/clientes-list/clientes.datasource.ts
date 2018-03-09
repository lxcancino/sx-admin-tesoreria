import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { Cliente } from '../../models';
import { ClienteService } from '../../services/cliente.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { catchError, finalize, delay } from 'rxjs/operators';

export class ClientesDataSource implements DataSource<Cliente> {
  private clientesSubject = new BehaviorSubject<Cliente[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  term = '';

  public loading$ = this.loadingSubject.asObservable();

  constructor(private service: ClienteService) {}

  connect(collectionViewer: CollectionViewer): Observable<Cliente[]> {
    return this.clientesSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.clientesSubject.complete();
    this.loadingSubject.complete();
  }

  loadClientes(
    term = '',
    sort = 'nombre',
    order = 'asc',
    page = 0,
    pageSize = 10,
    cartera = 'CRE'
  ) {
    this.loadingSubject.next(true);
    const filter = { term, sort, order, page, pageSize, cartera };
    this.service
      .list(filter)
      .pipe(
        // delay(3000),
        catchError(() => Observable.of([])),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(clientes => this.clientesSubject.next(clientes));
  }
}
