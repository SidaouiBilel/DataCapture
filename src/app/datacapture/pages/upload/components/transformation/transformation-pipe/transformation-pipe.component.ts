import { Component, OnInit } from '@angular/core';
import { NzDrawerRef } from 'ng-zorro-antd';
import { selectTranformationNodes } from '../store/transformation.selectors';
import { AddTransNode, ResetTransformation, TransformationFlipExpand } from '../store/transformation.actions';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { TRANSFORMATIONS } from '../transformations/transformers';
import { TranformationService } from '../services/tranformation.service';
import { take } from 'rxjs/operators';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-transformation-pipe',
  templateUrl: './transformation-pipe.component.html',
  styleUrls: ['./transformation-pipe.component.css']
})
export class TransformationPipeComponent implements OnInit {

  tarnsformations = TRANSFORMATIONS

  pipe$ = null;
  domain$ = null;

  active$;
  name = null
  saved = false

  constructor(
    private drawerRef: NzDrawerRef<string>, 
    private store: Store<AppState>,
    private pipes: TranformationService
    ) {
    this.pipe$ = this.store.select(selectTranformationNodes)
    this.domain$ = this.store.select(selectDomain)
    this.active$ = this.pipes.active$

    this.active$.subscribe((active)=> {
        this.name = (active)?active.name:null,
        this.saved = (active && active.id)?true:false
    })
  }

  close(): void {
    this.drawerRef.close(null);
  }

  ngOnInit() {

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

  onFlipCollapse(){
    this.store.dispatch(new TransformationFlipExpand())
  }

  onSave(){
    forkJoin(this.pipe$.pipe(take(1)), this.domain$.pipe(take(1)), this.active$.pipe(take(1))).subscribe(
      ([nodes, domain_id, active]:any) =>{
        let info = {
          id:null,
          name: this.name,
          description: null
        }
        if (active){
          info = {...active, ...info , id: active.id}
        }
        this.pipes.save(nodes, domain_id, info).subscribe(()=> this.afterSave())
      }
    )
  }

  onSaveAndApply(){
    this.pipes.upadatePreviewMode('TARGET')
    this.onSave()
  }

  onDelete(){
    this.active$.subscribe(
      (active:any) =>{
        this.pipes.delete(active).subscribe(()=> this.afterSave())
      }
    ).unsubscribe()
  }

  afterSave(){
    this.drawerRef.close()
  }
}
