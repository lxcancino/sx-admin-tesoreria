import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'sx-movimientos-tesoreria',
  templateUrl: './movimientos-tesoreria.component.html'
})
export class MovimientosTesoreriaComponent implements OnInit {
  navigation = [
    {
      path: 'depositoRetiro',
      title: 'Depósito/Retiro',
      description: 'Opcion 1',
      icon: ''
    },
    {
      path: 'comisiones',
      title: 'Comisiones ',
      description: 'Comisiones bancarias',
      icon: 'filter_none'
    },
    {
      path: 'traspasos',
      title: 'Traspasos ',
      description: 'Traspaso entre cuentas',
      icon: 'filter_none'
    },
    {
      path: 'inversiones',
      title: 'Inversiones ',
      description: 'Inversiones',
      icon: 'filter_none'
    },
    {
      path: 'devolucion',
      title: 'Devoluciones',
      description: 'Devoluciones a cliente',
      icon: ''
    }
  ];

  constructor(
    public media: TdMediaService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  /*
  reporteDeRelacionDePagos() {
    const dialogRef = this.dialog.open(RelacionPagosComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.service
          .reporteDeRelacionDePagos(data.fecha, data.origen, data.cobrador)
          .subscribe(
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
  */
}
