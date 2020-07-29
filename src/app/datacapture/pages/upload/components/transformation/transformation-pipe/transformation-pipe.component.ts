import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { selectTranformationNodes } from '../store/transformation.selectors';
import { AddTransNode, ResetTransformation } from '../store/transformation.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { TRANSFORMATIONS } from '../transformations/transformers';


@Component({
  selector: 'app-transformation-pipe',
  templateUrl: './transformation-pipe.component.html',
  styleUrls: ['./transformation-pipe.component.css']
})
export class TransformationPipeComponent implements OnInit {

  tarnsformations = TRANSFORMATIONS

  pipe$ = null

  constructor(private drawerRef: NzDrawerRef<string>, private store: Store<AppState>) {
    this.pipe$ = this.store.select(selectTranformationNodes)
  }

  close(): void {
    this.drawerRef.close(null);
  }

  ngOnInit() {
    // TODO STORE LOAD TRANSFORMATION
  }

  addTransformation(t){
    // TODO STORE ADD TRANSFORMATION
    const rule = {type:t.type, applied:false , valid:false}
    this.store.dispatch(new AddTransNode(rule))
    // this.pipe$.push(rule)
  }

  changeOrder(index, direction){
    // TODO STORE CHENGE ORDER
  }

  onReset(){
    this.store.dispatch(new ResetTransformation())
  }
}
