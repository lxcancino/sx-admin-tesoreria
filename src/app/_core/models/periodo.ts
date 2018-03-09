import * as moment from 'moment';

export class Periodo {
  constructor(
    public fechaInicial: Date = new Date(),
    public fechaFinal: Date = new Date()
  ) {}

  toString() {
    return `${moment(this.fechaInicial).format('DD/MM/YYYY')} - ${moment(
      this.fechaFinal
    ).format('DD/MM/YYYY')}`;
  }
}
