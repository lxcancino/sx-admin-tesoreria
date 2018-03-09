import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'sx-home-page',
  templateUrl: './home-page.component.html',
  styles: []
})
export class HomePageComponent implements OnInit {
  header$: Observable<string>;
  application$: Observable<any>;

  constructor() {}

  ngOnInit() {
    this.header$ = Observable.of('SIIPAPX Tesorería');
    this.application$ = Observable.of({
      name: 'SIIPAPX Tesorería',
      descripcion: 'Módulo de tesorería  de SIIPAPX',
      image: '/assets/images/logo_papelsa.jpg'
    });
  }
}
