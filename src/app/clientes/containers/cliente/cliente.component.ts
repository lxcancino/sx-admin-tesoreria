import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';

import { Cliente } from '../../models';
import { FechaDialogComponent } from '../../../_shared/components';

import { MatDialog } from '@angular/material';
import { ClienteService } from '../../services';

@Component({
  selector: 'sx-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit {
  cliente: Cliente;
  miniNav = false;

  navigation = [
    { path: 'info', title: 'Generales', icon: 'account_box' },
    { path: 'cxc', title: 'Cuentas x Cobrar', icon: 'today' },
    { path: 'facturas', title: 'Facturas', icon: 'file_download' },
    { path: 'cobros', title: 'Cobros', icon: 'attach_money' },
    { path: 'bonificaciones', title: 'Bonificaciones', icon: 'file_upload' },
    { path: 'devoluciones', title: 'Devoluciones', icon: 'file_upload' },
    { path: 'cargos', title: 'Notas de cargo', icon: 'keyboard_tab' },

    { path: '/clientes', title: 'Clientes', icon: 'arrow_back' }
  ];

  constructor(
    private route: ActivatedRoute,
    public media: TdMediaService,
    private service: ClienteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.cliente = this.route.snapshot.data.cliente;
  }

  cambiar() {}

  estadoDeCuenta() {
    const dialogRef = this.dialog.open(FechaDialogComponent, {
      data: { title: 'Estado de cuenta' }
    });
    dialogRef.afterClosed().subscribe(fecha => {
      if (fecha) {
        this.service.estadoDeCuenta(this.cliente, fecha, 'CRE').subscribe(
          res => {
            const blob = new Blob([res], {
              type: 'application/pdf'
            });
            // this.loadingService.resolve('saving');
            const fileURL = window.URL.createObjectURL(blob);
            window.open(fileURL, '_blank');
          },
          error2 => console.log(error2)
        );
      }
    });
  }
}
