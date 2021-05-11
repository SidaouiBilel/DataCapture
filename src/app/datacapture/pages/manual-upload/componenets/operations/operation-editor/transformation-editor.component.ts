import { selectTransformationNodes } from '../../../store/selectors/transformation.selectors';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { AddTransformationNode } from '../../../store/actions/transformation.actions';
import { TRANSFORMATIONS } from '../operations-node/transformations/manual_transformers';
import { ManualJobRun } from '../../../store/actions/job.actions';
import { CHECKS } from '../operations-node/checks/manual_checks';


@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  transformations = TRANSFORMATIONS
  checks = CHECKS

  nodes$ = null;

  constructor(private store: Store<AppState>) {
    this.nodes$ = this.store.select(selectTransformationNodes);
  }

  ngOnInit(): void {
  }

  addTransformation(t) {
    const node = { type: t.type, applied: false, valid: false };
    this.store.dispatch(new AddTransformationNode(node))
  }

  reset(){

  }

  apply(){
    this.store.dispatch(new ManualJobRun())
  }

}
