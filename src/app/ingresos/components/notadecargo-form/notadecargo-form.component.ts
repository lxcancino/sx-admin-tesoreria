import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormArray,
  FormControl
} from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { NotaDeCargo } from '../../models/notaDeCargo';

@Component({
  selector: 'sx-notadecargo-form',
  templateUrl: './notadecargo-form.component.html',
  styles: []
})
export class NotadecargoFormComponent implements OnInit, OnChanges, OnDestroy {
  form: FormGroup;

  @Input() cartera;

  @Output() cancel = new EventEmitter();

  @Output() save = new EventEmitter();

  @Output() timbrar = new EventEmitter();

  @Input() nota: NotaDeCargo;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.nota && !changes.nota.firstChange) {
      // console.log('Editando nota de cargo: ', changes.nota);
      this.form.patchValue(this.nota);
      this.nota.partidas.forEach(item => {
        // console.log('Agregando partida de nota de cargo: ', item);
        this.partidas.push(new FormControl(item));
      });
      this.form.get('total').setValue(this.nota.total);
      this.form.get('cliente').disable();
      this.form.get('tipoDeCalculo').disable();
      this.cartera = this.nota.tipo;
    }
  }

  buildForm() {
    this.form = this.fb.group({
      cliente: [null, Validators.required],
      tipoDeCalculo: ['PORCENTAJE', Validators.required],
      formaDePago: ['POR DEFINIR', Validators.required],
      usoDeCfdi: ['G03', Validators.required],
      cargo: [{ value: null, disabled: false }, [Validators.required]],
      total: [{ value: null, disabled: true }, [Validators.required]],
      comentario: null,
      partidas: this.fb.array([])
    });
    this.subscribers();
  }

  private subscribers() {
    // Listen to import
    this.form
      .get('tipoDeCalculo')
      .valueChanges.takeUntil(this.destroy$)
      .subscribe(importe => {
        this.actualizarTotal();
      });

    this.form
      .get('cargo')
      .valueChanges.takeUntil(this.destroy$)
      .subscribe(importe => {
        this.actualizarTotal();
      });
  }

  prepareEntity() {
    const entity = {
      ...this.form.value,
      tipo: this.cartera
    };
    if (this.nota) {
      const cliente = this.form.get('cliente').value;
      entity.cliente = { id: cliente.id };
      entity.id = this.nota.id;
    }
    return entity;
  }

  private actualizarTotal() {
    const tipo = this.form.get('tipoDeCalculo').value;
    if (tipo === 'PORCENTAJE') {
      const cargo = _.toNumber(this.form.get('cargo').value);
      if (cargo > 0.0) {
        const saldoTotal = _.sumBy(
          this.partidas.value,
          (item: any) => item.cuentaPorCobrar.saldo
        );
        const total = saldoTotal * (cargo / 100.0);
        this.form.get('total').setValue(_.round(total, 2));
      }
    } else {
      this.form.get('cargo').setValue(0.0);
    }
  }

  onSubmit() {
    const res = this.prepareEntity();
    // console.log('Salvando: ', res);
    if (this.isEditable()) {
      this.save.emit(res);
    }
  }

  isEditable() {
    if (this.nota) {
      return this.nota.uuid !== null;
    }
    return true;
  }

  agregarFacturas(facturas: Array<any>) {
    if (facturas) {
      facturas.forEach(item => {
        const det = {
          cuentaPorCobrar: item
        };
        this.partidas.push(new FormControl(det));
      });
      this.actualizarTotal();
    }
  }

  onDeletePartida(index: number) {
    this.partidas.removeAt(index);
    this.actualizarTotal();
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }
}
