import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input('columnDefs') set _columnDefs(value) {
    if (this.results) {
      this.columnDefs = value.map(h => {
        const cellClass = (params) => {
          const f = params.colDef.field;
          const i = params.rowIndex;
          try {
            if (this.results[i][f].errors.length > 0) {
              return 'error-cell';
            }
          } catch (error) {}
          try {
            if (this.results[i][f].warnings.length > 0) {
              return 'warning-cell';
            }
          } catch (error) {}
          return null;
        };
        h.cellClass = cellClass;
        return h;
      });
    } else {
      this.columnDefs = value;
    }
  }
  @Input() totalRecords;
  @Input() rowData: [];
  @Input() results: any[]; // errors
  @Input() defaultColDef;
  @Input() paginationPageSize = 50;

  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();

  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllEnterpriseModules;
  public columnDefs: any;

  ngOnInit() {
  }

  constructor() {
    this.rowData = [];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      editable: true,
    };
  }
}
