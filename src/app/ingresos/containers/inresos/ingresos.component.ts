import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TdMediaService } from '@covalent/core';
import { MatDialog } from '@angular/material';
import { FechaDialogComponent } from '../../../_shared/components';
import { CobrosService, FichasService } from '../../services';
import {
  RelacionPagosComponent,
  RelacionFichasComponent
} from '../../components';

@Component({
  selector: 'sx-ingresos',
  templateUrl: './ingresos.component.html'
})
export class IngresosComponent implements OnInit {
  navigation = [
    {
      path: 'cobros',
      title: 'Cobros',
      description: 'Registro de cobros',
      icon: 'attach_money'
    },
    {
      path: 'fichas',
      title: 'Fichas (CRE)',
      description: 'Fichas de depósito Crédito',
      icon: 'filter_none'
    },
    {
      path: 'fichasContado',
      title: 'Fichas (CON)',
      description: 'Fichas de depósito contado',
      icon: 'my_library_books'
    }
  ];

  cartera: { clave: string; descripcion: string };

  constructor(
    public media: TdMediaService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private service: CobrosService,
    private fichasService: FichasService
  ) {}

  ngOnInit() {
    this.cartera = this.route.snapshot.data.cartera;
  }

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

  reporteDeRelacionDeFichas() {
    const dialogRef = this.dialog.open(RelacionFichasComponent);
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        console.log('Reporte: ', data);

        this.fichasService
          .reporteDeRelacionDeFichas(data.fecha, data.origen)
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
}
