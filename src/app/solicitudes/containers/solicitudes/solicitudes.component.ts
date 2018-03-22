import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { SolicitudService } from '../../services';
import {
  FacturasCobradasComponent,
  CobranzaCodComponent
} from '../../components';

@Component({
  selector: 'sx-solicitudes',
  templateUrl: 'solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {
  navmenu: Object[] = [
    {
      route: 'pendientes',
      title: 'Pendientes',
      description: 'Depósitos por autorizar',
      icon: 'repeat'
    },
    {
      route: 'autorizadas',
      title: 'Autorizados',
      description: 'Depositos autorizados',
      icon: 'check'
    },
    {
      route: 'transito',
      title: 'Transito',
      description: 'Depositos en transito',
      icon: 'swap_horiz'
    },
    {
      route: 'canceladas',
      title: 'Canceladas',
      descripcion: 'Solicitudes canceladas',
      icon: 'cancel'
    }
    // {
    //   route: 'cobros',
    //   title: 'Cobros',
    //   description: 'Registro de cobros',
    //   icon: 'file_download'
    // }
  ];

  constructor(
    public media: TdMediaService,
    private dialog: MatDialog,
    private service: SolicitudService
  ) {}

  ngOnInit() {}

  facturasCobradas() {
    const dialogRef = this.dialog.open(FacturasCobradasComponent, {});
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('cobranzaContado', result).subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        });
      }
    });
  }

  cobranzaCod() {
    const dialogRef = this.dialog.open(CobranzaCodComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.runReport('cobranzaCod', result).subscribe(res => {
          const blob = new Blob([res], {
            type: 'application/pdf'
          });
          const fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL, '_blank');
        });
      }
    });
  }
}
