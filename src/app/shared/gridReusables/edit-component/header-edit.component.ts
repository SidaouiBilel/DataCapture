import {Component, OnDestroy} from '@angular/core';
import {IHeaderGroupParams} from '@ag-grid-enterprise/all-modules';
import { INoRowsOverlayAngularComp } from '@ag-grid-community/angular';

@Component({
    templateUrl: 'header-edit.component.html',
    styleUrls: ['header-edit.component.css']
})
export class HeaderEditComponent implements INoRowsOverlayAngularComp {
  public value;
    public params: IHeaderGroupParams;
    // public expanded: boolean;

  agInit(params): void {
    this.value = params.value;
  }

    /* onExpandChanged() {
        this.expanded = this.params.columnGroup.getOriginalColumnGroup().isExpanded()
    } */
}
