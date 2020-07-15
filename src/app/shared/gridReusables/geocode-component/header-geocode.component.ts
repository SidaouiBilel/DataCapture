import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import {IHeaderGroupAngularComp} from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-geocode.component.html',
    styleUrls: ['header-geocode.component.scss']
})
export class HeaderGeocodeComponent implements OnDestroy, IHeaderGroupAngularComp {
    public params: IHeaderGroupParams;
    // public expanded: boolean;

    agInit(params: IHeaderGroupParams): void {
        this.params = params;
        // this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
    }

    ngOnDestroy() {
        console.log(`Destroying HeaderGeocodeComponent`);
    }


    invokeGeocodeMethod() {
        console.log(' (header-geocode) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ invokeGeocodeMethod => do something here ');
    };

    /* onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    } */
}
