import { selectTransformationNodes } from '../../../store/selectors/transformation.selectors';
import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { AddTransformationNode } from '../../../store/actions/transformation.actions';
import { TRANSFORMATIONS } from '../transformations/transformers';


@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  transformations = TRANSFORMATIONS
  nodes$ = null;

  constructor(private modal: NzModalService, private store: Store<AppState>) {
    this.nodes$ = this.store.select(selectTransformationNodes);
  }

  ngOnInit(): void {
  }

  addTransformation(t) {
    const node = { type: t.type, applied: false, valid: false };
    this.store.dispatch(new AddTransformationNode(node))
  }



}
