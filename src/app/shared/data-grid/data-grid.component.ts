import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
import { INDEX_NAME, GAPIGridSelectionOverride } from '../utils/grid-api.utils';

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
    onRangeSelectionChanged: GAPIGridSelectionOverride,
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
