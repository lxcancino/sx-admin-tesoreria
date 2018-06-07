export interface ChequeDevuelto {
  id: string;
  folio: number;
  nombre: string;
  cheque: any;
  cxc: any;
  egreso: any;
  comentario?: string;
  recepcion?: string;
  creado: string;
  total: number;
  numero: number;
}
