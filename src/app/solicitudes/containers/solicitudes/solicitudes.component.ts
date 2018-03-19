import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

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

  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
