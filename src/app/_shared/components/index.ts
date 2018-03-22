import { DireccionComponent } from './direccion/direccion.component';
import { FooterComponent } from './footer/footer.component';
import { SearchTitleComponent } from './search-title/search-title.component';
import { BancoFieldComponent } from './banco-field/banco-field.component';
import { CuentaBancoFieldComponent } from './cuenta-banco-field/cuenta-banco-field.component';
import { FormaDePagoComponent } from './forma-de-pago/forma-de-pago.component';
import { UsoCfdiComponent } from './uso-cfdi/uso-cfdi.component';
import { FechaDialogComponent } from './fecha-dilog/fecha.dialog.component';
import { PeriodoDialogComponent } from './periodo-dialog/periodo-dialog.component';
import { PeriodoPickerComponent } from './periodo-picker/periodo-picker.component';

export const components = [
  DireccionComponent,
  FooterComponent,
  SearchTitleComponent,
  BancoFieldComponent,
  CuentaBancoFieldComponent,
  FormaDePagoComponent,
  UsoCfdiComponent,
  FechaDialogComponent,
  PeriodoDialogComponent,
  PeriodoPickerComponent
];

export const entyComponents: any[] = [
  FechaDialogComponent,
  PeriodoDialogComponent
];

export * from './direccion/direccion.component';
export * from './footer/footer.component';
export * from './search-title/search-title.component';
export * from './banco-field/banco-field.component';
export * from './cuenta-banco-field/cuenta-banco-field.component';
export * from './forma-de-pago/forma-de-pago.component';
export * from './uso-cfdi/uso-cfdi.component';
export * from './fecha-dilog/fecha.dialog.component';
export * from './periodo-dialog/periodo-dialog.component';
export * from './periodo-picker/periodo-picker.component';
