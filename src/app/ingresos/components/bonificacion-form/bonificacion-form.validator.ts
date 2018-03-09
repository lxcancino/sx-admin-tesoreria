import { AbstractControl, FormArray } from '@angular/forms';

export const BonoficacionFormValidator = (
  control: AbstractControl
): { [key: string]: boolean } => {
  // Valida que existan partidas
  const partidas = (control.get('partidas') as FormArray).value;
  if (partidas.length === 0) {
    return { sinPartidas: true };
  }

  const tipo = control.get('tipoDeCalculo').value;
  if (tipo === 'PRORRATEO') {
    const importe = control.get('importe').value;
    if (importe < 0) {
      return { importeInvalido: true };
    }
  } else {
    const descuento = control.get('descuento').value;
    return descuento <= 0 ? { descuentoRequerido: true } : null;
  }

  return null;
};
