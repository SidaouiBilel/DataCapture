import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent implements OnInit {
  @Input() columnDefs: any;
  @Input() totalRecords;
  frameworkComponents = { customTooltip: CustomTooltipComponent};
  @Input() rowData: [];
  @Input() defaultColDef;
  @Input() paginationPageSize = 50;

  @Output() gridReady: EventEmitter<any> = new EventEmitter<any>();
  @Output() cellValueChanged: EventEmitter<any> = new EventEmitter<any>();

  public loadingCellRendererParams = { loadingMessage: 'One moment please...'};
  public modules: any[] = AllEnterpriseModules;

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
