import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllCommunityModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

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

  @Output() ongridReady: EventEmitter<any> = new EventEmitter<any>();
  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllCommunityModules;
  columnDefs: any[];

  ngOnInit() {
  }

  constructor() {
    this.rowData = [];
    this.columnDefs = [
      { field: 'athlete', headerName: 'LA' },
      {
        field: 'age',
        maxWidth: 90,
        cellClassRules: {
          'rag-green': 'x < 20',
          'rag-amber': 'x >= 20 && x < 25',
          'rag-red': 'x >= 25',
        },
      },
      { field: 'country' }
    ];
    this.defaultColDef = {
      flex: 1,
      minWidth: 150,
      editable: true,
    };
  }

}
