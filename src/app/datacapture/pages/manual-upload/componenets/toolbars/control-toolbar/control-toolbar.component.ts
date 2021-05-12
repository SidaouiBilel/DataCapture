import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { TransformationEditorComponent } from '../../operations/operation-editor/transformation-editor.component';
import { CHECKS } from '../../operations/operations-node/checks/manual_checks';

@Component({
  selector: 'app-control-toolbar',
  templateUrl: './control-toolbar.component.html',
  styleUrls: ['./control-toolbar.component.css']
})
export class ControlToolbarComponent extends TransformationEditorComponent{
  checks = CHECKS

  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
  }

}
