import { Component, OnInit, Input } from '@angular/core';
import { Module } from 'ag-grid-community';
import { AllCommunityModules } from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input('columnDefs') set _columnDefs(value) {
    this.columnDefs = value.map(h=>{

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

      return h
    })
  };
  columnDefs;
  @Input() totalRecords;
  @Input() rowData: [];
  @Input() results: any[]; // errors
  @Input() defaultColDef;
  @Input() paginationPageSize = 50;

  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllCommunityModules;

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

// export class AppComponent {
//   private gridApi;
//   private gridColumnApi;

//   public modules: Module[] = AllCommunityModules;
//   private columnDefs;
//   private defaultColDef;
//   private rowData: [];

//   constructor(private http: HttpClient) {
//     this.columnDefs = [
//       { field: 'athlete' },
//       {
//         field: 'age',
//         maxWidth: 90,
//         valueParser: numberParser,
//         cellClassRules: {
//           'rag-green': 'x < 20',
//           'rag-amber': 'x >= 20 && x < 25',
//           'rag-red': 'x >= 25',
//         },
//       },
//       { field: 'country' },
//       {
//         field: 'year',
//         maxWidth: 90,
//         valueParser: numberParser,
//         cellClassRules: {
//           'rag-green-outer': function(params) {
//             return params.value === 2008;
//           },
//           'rag-amber-outer': function(params) {
//             return params.value === 2004;
//           },
//           'rag-red-outer': function(params) {
//             return params.value === 2000;
//           },
//         },
//         cellRenderer: function(params) {
//           return '<span class="rag-element">' + params.value + '</span>';
//         },
//       },
//       {
//         field: 'date',
//         cellClass: 'rag-amber',
//       },
//       {
//         field: 'sport',
//         cellClass: function(params) {
//           return params.value === 'Swimming' ? 'rag-green' : 'rag-amber';
//         },
//       },
//       {
//         field: 'gold',
//         valueParser: numberParser,
//         cellStyle: { backgroundColor: '#aaffaa' },
//       },
//       {
//         field: 'silver',
//         valueParser: numberParser,
//         cellStyle: function(params) {
//           var color = numberToColor(params.value);
//           return { backgroundColor: color };
//         },
//       },
//       {
//         field: 'bronze',
//         valueParser: numberParser,
//         cellStyle: function(params) {
//           var color = numberToColor(params.value);
//           return { 'background-color': color };
//         },
//       },
//     ];
//     this.defaultColDef = {
//       flex: 1,
//       minWidth: 150,
//       editable: true,
//     };
//   }

//   onGridReady(params) {
//     this.gridApi = params.api;
//     this.gridColumnApi = params.columnApi;

//     this.http
//       .get(
//         'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinnersSmall.json'
//       )
//       .subscribe(data => {
//         this.rowData = data;
//       });
//   }
// }

// function numberToColor(val) {
//   if (val === 0) {
//     return '#ffaaaa';
//   } else if (val == 1) {
//     return '#aaaaff';
//   } else {
//     return '#aaffaa';
//   }
// }
// function numberParser(params) {
//   var newValue = params.newValue;
//   var valueAsNumber;
//   if (newValue === null || newValue === undefined || newValue === '') {
//     valueAsNumber = null;
//   } else {
//     valueAsNumber = parseFloat(params.newValue);
//   }
//   return valueAsNumber;
// }
