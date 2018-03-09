import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  forwardRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ClienteService } from '../../services';
import { Cliente } from '../../models';

export const CLIENTE_LOOKUPFIELD_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ClienteFieldComponent),
  multi: true
};

@Component({
  selector: 'sx-cliente-field',
  providers: [CLIENTE_LOOKUPFIELD_VALUE_ACCESSOR],
  template: `
  <mat-form-field  class="fill">
    <input type="text" matInput [formControl]="searchControl" (blur)="onBlur()"
        [placeholder]="placeholder" #inputField
        [required]="required"
        [matAutocomplete]="auto"
        autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    <mat-icon matSuffix>search</mat-icon>
    <mat-error>
      Seleccione un cliente
    </mat-error>
  </mat-form-field>
  <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayFn" (optionSelected)="select($event)">
    <mat-option *ngFor="let cliente of clientes$ | async " [value]="cliente"
      [ngClass]="{'tc-red-800': !cliente.activo}">
        {{cliente.nombre}} ({{cliente.rfc}}) - {{cliente.credito ? 'Credito': 'Contado' }}
    </mat-option>
  </mat-autocomplete>
  `,
  styles: [
    `
    .fill {
      width: 100%;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClienteFieldComponent implements OnInit {
  apiUrl: string;

  searchControl = new FormControl();

  @Input() required = false;

  @Input() activos = true;

  @Input() tipo = 'CREDITO';

  @Input() placeholder = 'Cliente';

  clientes$: Observable<Cliente[]>;

  onChange;

  onTouch;

  @ViewChild('inputField') inputField: ElementRef;

  constructor(private service: ClienteService) {}

  ngOnInit() {
    this.clientes$ = this.searchControl.valueChanges
      .startWith(null)
      .switchMap(term => this.service.list({ term, cartera: this.tipo }));
  }

  select(event) {
    // console.log('Selected: ', event.option.value);
    this.onChange(event.option.value);
  }

  displayFn(cliente: Cliente) {
    return cliente
      ? `${cliente.nombre} (${cliente.rfc}) [${
          cliente.credito ? 'Crédito' : 'Contado'
        }]`
      : '';
  }

  writeValue(obj: any): void {
    this.searchControl.setValue(obj);
    if (obj === null) {
      this.searchControl.reset();
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.searchControl.disable() : this.searchControl.enable();
  }

  focus() {
    this.inputField.nativeElement.focus();
  }

  onBlur() {
    if (this.onTouch) {
      this.onTouch();
    }
  }
}
