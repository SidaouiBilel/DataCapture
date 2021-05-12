import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { TransformationEditorComponent } from '../../operations/operation-editor/transformation-editor.component';
import { TRANSFORMATIONS } from '../../operations/operations-node/transformations/manual_transformers';

@Component({
  selector: 'app-transform-toolbar',
  templateUrl: './transform-toolbar.component.html',
  styleUrls: ['./transform-toolbar.component.css']
})
export class TransformToolbarComponent extends TransformationEditorComponent {

  transformations = TRANSFORMATIONS

  constructor(store: Store<AppState>) {
    super(store);
  }

  ngOnInit(): void {
  }



}
