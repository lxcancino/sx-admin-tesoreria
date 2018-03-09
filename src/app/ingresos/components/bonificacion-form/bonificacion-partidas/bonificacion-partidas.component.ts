import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-bonificacion-partidas',
  templateUrl: './bonificacion-partidas.component.html',
  styles: []
})
export class BonificacionPartidasComponent implements OnInit {

  @Input() parent: FormGroup;

  @Input() partidas = [];

  @Output() delete = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get invalid() {
    // return this.parent.hasError('sinPartidas');
    return this.parent.get('partidas').value.length === 0
  }

}
