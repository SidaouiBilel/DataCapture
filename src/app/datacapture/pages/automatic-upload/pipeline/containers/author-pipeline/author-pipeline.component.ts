import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { PipelinesService } from '../../services/pipelines.service';
import { PipelineEditLinks, PipelineEditMetaData, PipelineEditNodes, PipelineEditRunId } from '../../store/pipeline.actions';
import { selectPipelineEditLinks, selectPipelineEditNodes, selectPipelineMetaData, selectRunId } from '../../store/pipeline.selectors';
import * as _ from 'lodash';
import { map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, interval, Observable, Subject, timer } from 'rxjs';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import { withValue } from '@app/shared/utils/rxjs.utils';

@Component({
  selector: 'app-author-pipeline',
  templateUrl: './author-pipeline.component.html',
  styleUrls: ['./author-pipeline.component.css']
})
export class AuthorPipelineComponent implements OnDestroy {

  // PIPELINE DATA
  links$;
  nodes$;
  metadata$;

  // RUN DATA
  runId$: Observable<string>;// MANGAGE RUNS HERE
  run$ = new BehaviorSubject(null)
  stop$;
  context :any= {}


  // LOADERS
  loadingTrigger$ = new BehaviorSubject<any>(null)

  constructor(public pipelines: PipelinesService, private service: PipelineEditorService, private ntf: NotificationService, private store: Store<AppState>) {
    // FETCH STORE DATA
    this.links$ = this.store.select(selectPipelineEditLinks).pipe(map(e => _.cloneDeep(e)));
    this.nodes$ = this.store.select(selectPipelineEditNodes).pipe(map(e => _.cloneDeep(e)));
    this.metadata$ = this.store.select(selectPipelineMetaData);
    this.runId$ = this.store.select(selectRunId);

    // LISTENERS
    this.runId$.pipe(tap(this.onRunIdChanged)).subscribe()
   }

   
  ngOnDestroy(): void {
    this.resetRunData()
  }

  // METHODS +
  getContextFromRun(run: any) {
    this.context = {};
    if (run) {
      this.context[run.state] = true;
      this.context.preview = (run.conf) ? run.conf.preview : false;
      this.context.paused = run.paused;
    } else {
      this.context.idle = true;
    }
    this.context.monitor = (this.context.success || this.context.running || this.context.failed);
    this.context.monitor_as_preview = this.context.preview && this.context.monitor;
    this.context.monitor_as_run = !this.context.preview && this.context.monitor;
  }

  publish(notify=true){
    return new Observable(observer=>{
      forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        // SAVE AND PUBLISH
        this.pipelines.saveDag(metaData,nodes,links).subscribe(()=>{
          this.pipelines.publishDag(nodes, links, metaData).subscribe(() => {
            if(notify) this.ntf.success('Pipeline Published');
            observer.next()
          });
        });
      })
    })
  }

  save() {
    forkJoin([this.links$.pipe(take(1)), this.nodes$.pipe(take(1)), this.metadata$.pipe(take(1))])
      .subscribe(([links, nodes, metaData]: any) => {
        if (metaData.name != '') {
          this.pipelines.saveDag(metaData, nodes, links).subscribe((pipeline_id) => {
              this.store.dispatch(new PipelineEditMetaData({...metaData, pipeline_id}));
              this.ntf.success('Pipeline saved.');
            });
        } else {
          this.edit();
        }
      });
  }

  edit() {
    this.metadata$.pipe(take(1)).subscribe((metaData) => {
      this.service.editPipeline({...metaData}).subscribe((r) => {
        if (r) { this.store.dispatch(new PipelineEditMetaData(r)); }
      });
    })
  }

  monitorRun(runId) {
    // CANCEL PREVIOUS POOLING
    // START POOLING NEW DATA
    this.stopMonitoring()
    this.stop$ = new Subject()
    timer(0,5000).pipe(
      takeUntil(this.stop$), 
      switchMap(()=>this.pipelines.getRun(runId)),
      tap(this.onRunDataRecieved)
      ).subscribe();
  }

  monitorCurrentRun=()=>{
    // CALL TO GET IMMEDIATE RESULT or RESTART POOLING
    withValue(this.runId$, (runId)=>{
      this.monitorRun(runId)
    })
  }
  
  resetRunData(){
    // STOP RUN MONITORING AND CLEAR CURRENT RUN DATA
    this.stopMonitoring()
    this.run$.next(null)
    this.getContextFromRun(null);
  }

  stopMonitoring(){
    // STOP MONITORING THE CURRENT RUN
    if (this.stop$) this.stop$.next()
  }
  // CLASS FUNCIONS -

  // EVENT HANDLERS +
  onRunIdChanged=(runId)=>{
    if(runId){
      this.monitorCurrentRun();
    } else {
      this.resetRunData();
    }
  }

  onRunDataRecieved=(run_res:any)=>{
    this.getContextFromRun(run_res);
    if(['success','failed'].includes(run_res.state)) this.stopMonitoring()
    else if(this.context.paused) this.stopMonitoring()
    this.run$.next(run_res)
  }

  onDiagramNodeDataChange(nodes){
    this.store.dispatch(new PipelineEditNodes(nodes));
  }

  onDiagramLinkDataChange(links){
    this.store.dispatch(new PipelineEditLinks(links));
  }
  
  onTriggerComplete=()=>{
    this.loadingTrigger$.next(null)
  }
  // EVENT HANDLERS -

  // TRIGGER EVENTS +
  onJumpNext(){
    // TODO
    // CHECK IF THERE IS ANY MODIFICATIONS 
    // IF TRUE SAVE AND PUBLISH THEN UNPAUSE
    // IF NOT JUST UNPAUSE
    this.loadingTrigger$.next('continue')
    this.publish(false).subscribe((res=>{
      withValue(this.metadata$, (p)=>{
        this.pipelines.unpause(p.pipeline_id, {stop_at:null}).pipe(tap(this.onTriggerComplete)).pipe(tap(()=>this.monitorCurrentRun())).subscribe()
      })
    }))
  }

  onContinue(){
    // UNPAUSE DAG EXECUTION
    this.loadingTrigger$.next('continue')
    withValue(this.metadata$, (p)=>{
      this.pipelines.unpause(p.pipeline_id, {stop_at:null}).pipe(tap(this.onTriggerComplete)).pipe(tap(this.monitorCurrentRun)).subscribe()
    })
  }

  onPause(){
    // PAUSE DAG EXECUTION
    this.loadingTrigger$.next('pause')
    withValue(this.metadata$, (p)=>{
      this.pipelines.pause(p.pipeline_id, {stop_at:null}).pipe(tap(this.onTriggerComplete)).pipe(tap(this.monitorCurrentRun)).subscribe()
    })
  }

  onCancel(){
    // TODO
    // CALL WEBSERVICE TO CANCEL RUN
    // UPDATE STORE
    this.loadingTrigger$.next('cancel')
    this.resetRunData()
    this.store.dispatch(new PipelineEditRunId({run_id: null, pipeline_id: null}));
    this.onTriggerComplete()
  }

  onPublish(){
    this.loadingTrigger$.next('publish')
    this.publish().pipe(tap(this.onTriggerComplete)).subscribe()
  }

  onTrigger(config={}){
    this.loadingTrigger$.next('run')
    this.resetRunData()
    withValue(this.metadata$,(p)=>{
      this.pipelines.trigger(p.pipeline_id, config)
      .pipe(tap(this.onTriggerComplete))
      .subscribe((res:any)=>{
        const run_id = res.run_id;
        this.store.dispatch(new PipelineEditRunId({run_id, pipeline_id: p.pipeline_id}));
      })
    })
  }

  onTriggerPreview(){
    this.onTrigger({preview:true})
  }
  // TRIGGER EVENTS -
}
