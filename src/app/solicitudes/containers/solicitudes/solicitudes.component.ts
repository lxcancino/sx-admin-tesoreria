import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-solicitudes',
  templateUrl: 'solicitudes.component.html'
})
export class SolicitudesComponent implements OnInit {
  navmenu: Object[] = [
    {
      icon: 'looks_one',
      route: 'pendientes',
      title: 'Pendientes',
      description: 'Solicitudes por autorizar'
    },
    {
      icon: 'looks_two',
      route: 'autorizadas',
      title: 'Autorizadas',
      description: 'Solicitudes autorizadas'
    }
  ];
  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
