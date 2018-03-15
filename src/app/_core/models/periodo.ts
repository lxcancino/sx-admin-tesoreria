import * as moment from 'moment';

export class Periodo {
  static parse(json: string) {
    const pJson = JSON.parse(json);
    const f1 = new Date(pJson.fechaInicial);
    const f2 = new Date(pJson.fechaFinal);
    return new Periodo(f1, f2);
  }

  constructor(
    public fechaInicial: Date = new Date(),
    public fechaFinal: Date = new Date()
  ) {}

  toString() {
    return `${moment(this.fechaInicial).format('DD/MM/YYYY')} - ${moment(
      this.fechaFinal
    ).format('DD/MM/YYYY')}`;
  }

  toJson() {
    return JSON.stringify(this);
  }
}