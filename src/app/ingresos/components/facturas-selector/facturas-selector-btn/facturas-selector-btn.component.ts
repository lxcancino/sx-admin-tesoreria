import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FacturasSelectorComponent } from '../facturas-selector.component';

@Component({
  selector: 'sx-facturas-selector-btn',
  template: `
    <button mat-button (click)="lookup()" type="button" [disabled]="disabled">
      <span>{{title}}</span>
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: []
})
export class FacturasSelectorBtnComponent implements OnInit {
  @Input() title = 'Seleccionar facturas';

  @Output() seleccionar = new EventEmitter();

  @Input() cliente: any;

  @Input() disabled = false;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  lookup() {
    console.log('Presentar el dialogo para la seleccion de facturas');
    const dialogRef = this.dialog.open(FacturasSelectorComponent, {
      width: '850px',
      height: '700px',
      data: {
        cliente: this.cliente
      }
    });
    dialogRef.afterClosed().subscribe(facturas => {
      if (facturas !== null) {
        this.seleccionar.emit(facturas);
      }
    });
  }
}
