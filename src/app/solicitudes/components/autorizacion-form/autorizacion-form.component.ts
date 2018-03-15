import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { SolicitudDeDeposito } from '../../models';

@Component({
  selector: 'sx-autorizacion-form',
  templateUrl: './autorizacion-form.component.html'
})
export class AutorizacionFormComponent implements OnInit {
  solicitud: SolicitudDeDeposito;
  duplicada: SolicitudDeDeposito;

  constructor(
    private dialogRef: MatDialogRef<AutorizacionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.solicitud = data.solicitud;
    this.duplicada = data.duplicada;
  }

  ngOnInit() {}

  private buildForm() {}

  onSubmit() {}
}
