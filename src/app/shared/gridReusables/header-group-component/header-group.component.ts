import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import {IHeaderGroupAngularComp} from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-group.component.html',
    styleUrls: ['header-group.component.css']
})
// mei7 OnDestroy,
export class HeaderGroupComponent implements  IHeaderGroupAngularComp {
    public params: IHeaderGroupParams;
    public expanded: boolean;
    // public gridApi;

    agInit(params: IHeaderGroupParams): void {
        this.params = params;
        // this.gridApi = params.api;
        this.params.columnGroup.getOriginalColumnGroup().addEventListener('expandedChanged', this.onExpandChanged.bind(this));
        // console.log('**** params header-group ****');
        // console.log(params);
        // console.log(this.gridApi);
    }

    // mei7
    /* ngOnDestroy() {
        console.log(`Destroying HeaderComponent`);
    } */

    /* purgeCache() {
        this.gridApi.purgeServerSideCache([]);
    } */
    expandOrCollapse() {
        this.params.setExpanded(!this.expanded);
    };

    onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    }
}
