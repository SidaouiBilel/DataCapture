import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { AddTransformationNode } from '../../../store/actions/transformation.actions';
import { TRANSFORMATIONS } from '../../operations/operations-node/transformations/manual_transformers';

@Component({
  selector: 'app-transform-toolbar',
  templateUrl: './transform-toolbar.component.html',
  styleUrls: ['./transform-toolbar.component.css']
})
export class TransformToolbarComponent implements OnInit {

  transformations = TRANSFORMATIONS


  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  addTransformation(t) {
    const node = { type: t.type, applied: false, valid: false };
    this.store.dispatch(new AddTransformationNode(node))
  }



}
