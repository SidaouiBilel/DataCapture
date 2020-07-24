import {Component} from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-supp.component.html',
    styleUrls: ['header-supp.component.scss']
})
export class HeaderSuppComponent implements ITooltipAngularComp {

    public params: any;
    public data: any;

    agInit(params): void {
        this.params = params;

        this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        this.data.color = this.params.color || 'white';
    }
}
