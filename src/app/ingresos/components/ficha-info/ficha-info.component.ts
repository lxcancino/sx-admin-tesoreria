import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ITdDataTableColumn } from '@covalent/core';

@Component({
  selector: 'sx-ficha-info',
  template: `
  <h2 mat-dialog-title>Detalle de ficha {{ficha.folio}} </h2>
  <mat-dialog-content>
    <td-data-table [columns]="columns" [data]="cheques">
      <ng-template tdDataTableTemplate="cobro.importe" let-value="value" let-row="row" >
        {{value | currency: 'USD': 1.2-2}}
      </ng-template>
    </td-data-table>
  </mat-dialog-content>

  <mat-dialog-actions>
    <button mat-button mat-dialog-close>Cerrar</button>
  </mat-dialog-actions>
  `
})
export class FichaInfoComponent implements OnInit {
  ficha;
  cheques;

  columns: ITdDataTableColumn[] = [
    {
      name: 'bancoOrigen.nombre',
      label: 'Bano',
      width: 120,
      nested: true
    },
    {
      name: 'numero',
      label: 'No',
      width: 100
    },
    {
      name: 'cobro.nombre',
      label: 'Cliente'
    },
    {
      name: 'cobro.importe',
      label: 'Importe'
    }
  ];

  constructor(
    public dialogRef: MatDialogRef<FichaInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ficha = data.ficha;
    this.cheques = data.cheques;
  }

  ngOnInit() {}
}
