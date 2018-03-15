import { Component, OnInit } from '@angular/core';
import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'sx-cortes',
  templateUrl: './cortes.component.html'
})
export class CortesComponent implements OnInit {
  navmenu: Object[] = [
    {
      icon: 'credit_card',
      route: 'pendientes',
      title: 'Pendientes',
      description: 'Cobros con tarjeta'
    },
    {
      icon: 'account_balance_wallet',
      route: 'registrados',
      title: 'Registrados',
      description: 'Cortes de tarjeta'
    }
  ];
  constructor(public media: TdMediaService) {}

  ngOnInit() {}
}
