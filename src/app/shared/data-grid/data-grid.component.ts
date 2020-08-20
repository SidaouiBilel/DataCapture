import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import { INDEX_NAME } from '../utils/grid-api.utils';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input() columnDefs: any;
  @Input() totalRecords;
  @Input() rowData: [];
  @Input() defaultColDef;
  @Input() paginationPageSize = 50;
  @Input() contextMenu = null;
  @Input() mainContextMenu = null;
  @Input() rangeSelection = false;

  @Input() gridOptions = {
    enableRangeSelection: true,
    onRangeSelectionChanged: event => {
        var cellRanges = event.api.getCellRanges();
        if (!cellRanges || cellRanges.length === 0) return;
        var excludeColumn = false
        const params = []
        for(let range of cellRanges){
          excludeColumn = excludeColumn || range.columns.find(
            el => el.getColId() === INDEX_NAME
            );
            params.push({
              rowStartIndex: range.startRow.rowIndex,
              rowStartPinned: range.startRow.rowPinned,
              rowEndIndex: range.endRow.rowIndex,
              rowEndPinned: range.endRow.rowPinned,
              columns: range.columns
                  .map(el => el.getColId())
                  .filter(el => el !== INDEX_NAME),
            })
        }
        if (!excludeColumn) return;
        event.api.clearRangeSelection();
        for(let rangeParams of params)
          event.api.addCellRange(rangeParams);
    },
  };;
  // @Input() fillOperation: (args: any) => void;

  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellValueChanged: EventEmitter<any> = new EventEmitter<any>();

  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllEnterpriseModules;
  public frameworkComponents = { customTooltip: CustomTooltipComponent};

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
