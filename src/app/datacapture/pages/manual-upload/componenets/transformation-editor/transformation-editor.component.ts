import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { AddTransformationNode } from '../../store/actions/transformation.actions';
import { TRANSFORMATIONS } from '../transformations/transformers';


@Component({
  selector: 'app-transformation-editor',
  templateUrl: './transformation-editor.component.html',
  styleUrls: ['./transformation-editor.component.css']
})
export class TransformationEditorComponent implements OnInit {

  constructor(private modal: NzModalService, private store: Store<AppState>) { }

  transformations = TRANSFORMATIONS

  ngOnInit(): void {
    console.log(this.transformations[0])
  }

  addTransformation(t) {
    const node = { type: t.type, applied: false, valid: false };
    this.store.dispatch(new AddTransformationNode(node))

    //   const modal = this.modal.create({
    //   nzContent: t.component,
    //   nzFooter: null,
    //   nzWidth: 400,
    //   nzComponentParams:{
    //   },
    // })
  }
}
