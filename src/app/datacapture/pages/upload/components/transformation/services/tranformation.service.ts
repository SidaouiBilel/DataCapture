import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { LoadTransformation, SetPreviewMode, TransformationFlipExpand, UpdateEditedPipeInfo, AddTransNode } from '../store/transformation.actions';
import { selectActivePipe,
        selectPreviewMode,
        selectPipeExpanded,
        selectTranformationNodes,
        selectEdiedTranformationPipeInfo, 
        selectTranformationValid,
        selectActivePipeModified} from '../store/transformation.selectors';
import { Observable, ReplaySubject, forkJoin } from 'rxjs';
import { tap, take } from 'rxjs/operators';

@Injectable()
export class TranformationService {

  url = environment.transform;
  domainId = null;
  domainPipes$ = new ReplaySubject<any>();
  active$: Observable<any>;
  expanded$: Observable<boolean>;
  previewMode$: Observable<any>;
  edited$: Observable<any>;
  nodes$: Observable<any>;
  domain$: Observable<any>;
  canSave$: Observable<any>;
  modified$: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private msg: NotificationService
    ) {
      this.store.select(selectDomain).subscribe((domainId) => {
        if (domainId) {
          if (this.domainId && (this.domainId !== domainId.id)) {
            this.setActive(null);
          }
          this.domainId = domainId.id;
        }
        this.loadDomainPipes();
      });
      this.edited$ = this.store.select(selectEdiedTranformationPipeInfo);
      this.active$ = this.store.select(selectActivePipe);
      this.previewMode$ = this.store.select(selectPreviewMode);
      this.expanded$ = this.store.select(selectPipeExpanded);
      this.nodes$ = this.store.select(selectTranformationNodes);
      this.canSave$ = this.store.select(selectTranformationValid);
      this.modified$ = this.store.select(selectActivePipeModified);
  }

  save(pipe) {
    return this.http.post(`${this.url}`, pipe).pipe(
      tap(() => this.loadDomainPipes()),
      tap((active) => {
        this.setActive(active);
      }),
      );
    }

    delete(pipeInfo) {
      return this.http.request('DELETE', `${this.url}`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: {...pipeInfo, modified_on: new Date()}
      }).pipe(
        tap(() => this.loadDomainPipes()),
        tap((active) => {
          this.setActive(null);
        }),
        );
      }

      setActive(active) {
        this.store.dispatch(new LoadTransformation(active));
        if(active){
          this.msg.default(`Pipe "${active.name}" set as active`)
        }
      }

      get(domainId) {
        return this.http.get(`${this.url}${domainId}`);
      }

  getInContext() {
    return this.get(this.domainId);
  }

  loadDomainPipes() {
    this.getInContext().subscribe(res => this.domainPipes$.next(res));
  }

  upadatePreviewMode(mode: any) {
    this.store.dispatch(new SetPreviewMode(mode));
  }

  flipCollapse() {
    this.store.dispatch(new TransformationFlipExpand());
  }

  updateEdited(pipeInfo: any) {
    this.store.dispatch(new UpdateEditedPipeInfo(pipeInfo))
  }

  saveEdited() {
    this.canSave$.pipe(take(1)).subscribe((canSave)=>{
      if(canSave){
        forkJoin(this.nodes$.pipe(take(1)), this.edited$.pipe(take(1))).subscribe(
          ([nodes, edited]: any) => {
            const pipe:any = {
              name: edited.name,
              description: edited.description,
              modified_on: new Date(),
              created_on: edited.created_on || new Date(),
              nodes,
              domain_id: this.domainId,
              id: edited.id
            };
            
            this.save(pipe).subscribe(()=> this.msg.success('Pipe Saved.'));
          }
          );
        }else{
          this.msg.error('Cannot save pipe yet.')
        }
      })
  }

  addTransformaion(rule){
    // const rule = {type: transformer.type};
    this.store.dispatch(new AddTransNode(rule));
  }
}
