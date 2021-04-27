import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { selectTranformationNodeStatus } from '@app/datacapture/pages/upload/components/transformation/store/transformation.selectors';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { TRANSFORMATIONS } from '../../transformers';

@Component({
  selector: 'app-transformation-node',
  templateUrl: './transformation-node.component.html',
  styleUrls: ['./transformation-node.component.css']
})
export class TransformationNodeComponent implements OnInit {

  transofrmation

  expanded$ = new BehaviorSubject(false)

  params
  status$
  index
  @Input('index') set _index(value) {
    this.index = value
    // this.status$ = this.store.select(selectTranformationNodeStatus(this.index))
  }
  @Input("params") set _params(value){
    this.params = JSON.parse(JSON.stringify(value))
    this.updateTransformation()
    // this.loadComponent();
  }

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  updateTransformation(){
    if (this.params && this.params.type){
      for (let t of TRANSFORMATIONS){
        if (t.type == this.params.type){
          this.transofrmation = t;
          break;
        }
      }
    }
  }

}
