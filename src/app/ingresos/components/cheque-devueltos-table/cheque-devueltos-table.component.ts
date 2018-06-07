import {
  Component,
  OnInit,
  OnChanges,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { ChequeDevuelto } from '../../models/chequeDevuelto';

@Component({
  selector: 'sx-cheque-devueltos-table',
  templateUrl: './cheque-devueltos-table.component.html',
  styleUrls: ['./cheque-devueltos-table.component.scss']
})
export class ChequeDevueltosTableComponent
  implements OnInit, OnChanges, AfterViewInit {
  dataSource = new MatTableDataSource<ChequeDevuelto>([]);
  @Input() cheques;
  @Input() searchTerm;
  @Output() recepcion = new EventEmitter();
  columnsToDisplay = ['nombre', 'fecha', 'total', 'recepcion'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.cheques && changes.cheques.currentValue) {
      this.dataSource.data = changes.cheques.currentValue;
    }
    if (changes.searchTerm && changes.searchTerm.currentValue) {
      this.dataSource.filter = changes.searchTerm.currentValue;
    }
  }
}
