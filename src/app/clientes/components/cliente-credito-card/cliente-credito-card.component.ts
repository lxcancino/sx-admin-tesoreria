import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { Cliente } from '../../models';

@Component({
  selector: 'sx-cliente-credito-card',
  templateUrl: 'cliente-credito-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteCreditoCardComponent implements OnInit {
  @Input() cliente: Cliente;
  @Output() edit = new EventEmitter<Cliente>();
  constructor() {}

  ngOnInit() {}
}
