import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

import { Cliente } from '../../models';
import { ClienteCreditoFormComponent } from '../../components';
import { ClienteService, CreditoService } from '../../services';

@Component({
  selector: 'sx-cliente-info',
  templateUrl: `./cliente-info.component.html`
})
export class ClienteInfoComponent implements OnInit {
  cliente$: Observable<Cliente>;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clienteService: ClienteService,
    private creditoService: CreditoService
  ) {}

  ngOnInit() {
    this.cliente$ = this.route.parent.data.map(data => data.cliente);
  }
  load() {
    this.cliente$ = this.route.parent.data.switchMap(data =>
      this.clienteService.get(data.cliente.id)
    );
    // this.cliente$ = this.clienteService.get()
  }

  onEditCliente(cliente: Cliente) {}

  onEditCredito(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteCreditoFormComponent, {
      data: { cliente: cliente },
      height: '500px',
      width: '500px'
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        console.log('Actualizando credito: ', res);
        this.creditoService.update(cliente, res).subscribe(rr => {
          console.log(rr);
          this.load();
        });
      }
    });
  }
}
