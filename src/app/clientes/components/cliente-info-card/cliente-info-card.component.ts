import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';
import { Cliente } from '../../models';

@Component({
  selector: 'sx-cliente-info-card',
  templateUrl: './cliente-info-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteInfoCardComponent implements OnInit, OnChanges {
  @Output() editar = new EventEmitter();

  @Input() cliente: Cliente;

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes) {
    console.log('Changes: ', changes);
  }
}
