import {Component} from '@angular/core';
import { ITooltipAngularComp } from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-supp.component.html',
    styleUrls: ['header-supp.component.scss']
})
export class HeaderSuppComponent implements ITooltipAngularComp {

    private params: any;
    private data: any;

    agInit(params): void {
        this.params = params;

        this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
        this.data.color = this.params.color || 'white';
    }

    // agInit(params: IHeaderGroupParams): void {
    //     this.params = params;
    //     // this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    // }

    /* onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    } */
}
