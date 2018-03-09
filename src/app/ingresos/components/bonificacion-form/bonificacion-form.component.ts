import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  ChangeDetectorRef,
  HostListener,
  ViewChild
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  AbstractControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';

import { BonoficacionFormValidator } from './bonificacion-form.validator';
import { FacturasSelectorBtnComponent } from '../facturas-selector/facturas-selector-btn/facturas-selector-btn.component';

@Component({
  selector: 'sx-bonificacion-form',
  templateUrl: './bonificacion-form.component.html',
  styles: [
    `
    .slim {
      width: 120px;
    }
  `
  ]
})
export class BonificacionFormComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @Input() cartera = 'NO';

  @Output() save = new EventEmitter<any>();

  @Output() cancelar = new EventEmitter();

  destroy$ = new Subject<boolean>();

  @ViewChild('insertBtn') insertBtn: FacturasSelectorBtnComponent;

  facturas = [];

  totalFacturas = 0.0;
  saldoFacturas = 0.0;
  descuentoNeto = 0.0;

  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {}

  private buildForm() {
    this.form = this.fb.group(
      {
        cliente: [null, Validators.required],
        tipoDeCalculo: 'PORCENTAJE',
        baseDelCalculo: 'Saldo',
        fecha: [{ value: new Date(), disabled: true }],
        cartera: [this.cartera, Validators.required],
        moneda: [{ value: 'MXN', disabled: true }, Validators.required],
        tipoDeCambio: [{ value: 1.0, disabled: true }],
        importe: [
          { value: 0.0, disabled: true },
          [Validators.required, Validators.min(1.0)]
        ],
        descuento: [{ value: 0.0, disabled: false }, [Validators.max(99.99)]],
        descuento2: [{ value: 0.0, disabled: false }, [Validators.max(99.99)]],
        comentario: [''],
        partidas: this.fb.array([])
      },
      { validator: BonoficacionFormValidator }
    );
    this.observarTipoDeCalculo();
    this.observarDescuentos();
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private observarTipoDeCalculo() {
    this.form
      .get('tipoDeCalculo')
      .valueChanges.takeUntil(this.destroy$)
      .subscribe((tipo: string) => {
        switch (tipo) {
          case 'PORCENTAJE':
            this.calculoPorcentual();
            this.actualizar();
            break;
          case 'PRORRATEO':
            this.calculoProrrateo();
            this.actualizar();
            break;
        }
      });
  }

  private observarDescuentos() {
    const desc$ = this.form
      .get('descuento')
      .valueChanges.takeUntil(this.destroy$);
    const desc2$ = this.form
      .get('descuento2')
      .valueChanges.startWith(0)
      .takeUntil(this.destroy$);
    Observable.combineLatest(desc$, desc2$, (desc1: number, desc2: number) => {
      if (desc2 > 0.0) {
        const descuento = +desc1;
        const r = 100.0 - descuento;
        const r2 = desc2 * r / 100;
        const neto: number = descuento + r2;
        return neto;
      } else {
        return +desc1;
      }
    })
      .takeUntil(this.destroy$)
      .subscribe(neto => {
        this.descuentoNeto = neto;
        this.actualizar();
      });
  }

  calculoPorcentual() {
    this.form.get('importe').disable();
    this.form.get('descuento').enable();
  }

  calculoProrrateo() {
    this.form.get('importe').enable();
    this.form.get('descuento').disable();
    this.form.get('descuento2').disable();
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit(this.prepareEntity());
    }
  }

  private prepareEntity() {
    const res = { ...this.form.value };
    res.tipoCartera = this.cartera;
    res.tipo = 'BONIFICACION';
    res.serie = 'BON';
    res.total = res.importe;
    return res;
  }

  agregarFacturas(facturas: Array<any>) {
    if (facturas) {
      facturas.forEach(item => {
        const det = {
          cuentaPorCobrar: item
        };
        this.partidas.push(new FormControl(det));
        // this.facturas.push(det);
      });
      this.actualizar();
      this.cd.detectChanges();
    }
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onDeletePartida(index: number) {
    this.partidas.removeAt(index);
    this.actualizar();
  }

  actualizar() {
    this.totalFacturas = _.sumBy(
      this.partidas.value,
      (item: any) => item.cuentaPorCobrar.total
    );
    this.saldoFacturas = _.sumBy(
      this.partidas.value,
      (item: any) => item.cuentaPorCobrar.saldo
    );
    const base = this.form.get('baseDelCalculo').value;
    const importeBase =
      base === 'Saldo' ? this.saldoFacturas : this.totalFacturas;
    if (this.form.get('tipoDeCalculo').value === 'PORCENTAJE') {
      const importe = importeBase * (this.descuentoNeto / 100);
      this.form.get('importe').setValue(importe);
    }
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.code === 'Insert') {
      if (this.form.get('cliente').value !== null) {
        this.insertBtn.lookup();
      }
      // console.log('Insertar partida')
    }
    if (event.code === 'F10') {
      // console.log('Salvando con tecla F10')
    }
  }
}
