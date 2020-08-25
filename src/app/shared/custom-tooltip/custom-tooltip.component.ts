import { Component, OnInit } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent implements ITooltipAngularComp  {
  private params: any;
  // private data: any;
  errors = [];
  field = '';
  agInit(params): void {
    this.params = params;
    // this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.field = params.colDef.headerName;
    if (params.error[params.rowIndex][params.colDef.field]) {
      this.errors = params.error[params.rowIndex][params.colDef.field].errors;
    }
  }

}
