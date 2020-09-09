import { Component, OnInit } from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';
import { take } from 'rxjs/operators';

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
    this.params.error.pipe(take(1)).subscribe((errors) => {
      if (errors[params.rowIndex] && errors[params.rowIndex][params.colDef.field]) {
        this.errors = errors[params.rowIndex][params.colDef.field].errors;
      }
    })
  }

}
