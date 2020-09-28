import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState, NotificationService } from '@app/core';
import { Store } from '@ngrx/store';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { LoadTransformation, SetPreviewMode, TransformationFlipExpand, UpdateEditedPipeInfo, AddTransNode, UpdateNodeOrder } from '../store/transformation.actions';
import { selectActivePipe,
        selectPreviewMode,
        selectPipeExpanded,
        selectTranformationNodes,
        selectEdiedTranformationPipeInfo,
        selectTranformationValid,
        selectActivePipeModified,
        selectTranformationInfoValid,
        selectTranformationNodesValid} from '../store/transformation.selectors';
import { Observable, ReplaySubject, forkJoin, combineLatest } from 'rxjs';
import { tap, take } from 'rxjs/operators';
import { TransformerFactory } from '../transformations/transformers';

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
        if(active) this.upadatePreviewMode('TARGET')
        else this.upadatePreviewMode('SOURCE');
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
    this.store.dispatch(new UpdateEditedPipeInfo(pipeInfo));
  }

  saveEdited(asNew= false) {
    combineLatest(
      this.canSave$,
      this.store.select(selectTranformationInfoValid),
      this.store.select(selectTranformationNodesValid),
    ).pipe(take(1)).subscribe(([canSave, validInfo, validNodes]) => {
      if (canSave) {
        forkJoin(this.nodes$.pipe(take(1)), this.edited$.pipe(take(1))).subscribe(
          ([nodes, edited]: any) => {
            const pipe: any = {
              name: edited.name,
              description: edited.description,
              modified_on: new Date(),
              created_on: edited.created_on || new Date(),
              nodes,
              domain_id: this.domainId,
              id: edited.id
            };

            // SAVE AS NEW
            if (asNew) { pipe.id = null; }
            this.save(pipe).subscribe(() => this.msg.success('Pipe Saved.'));
          }
        );
        } else {
          const message = ['Cannot save pipe:'];
          if (!validNodes) {  message.push('<b>&#8226 All nodes must be valid</b>'); }
          if (!validInfo) {   message.push('<b>&#8226 Missing pipe information</b>'); }
          this.msg.error(message.join('<br />'));
        }
      });
  }

  addTransformaion(rule) {
    this.store.dispatch(new AddTransNode(rule));
    this.msg.default(`<b>${TransformerFactory(rule.type).label}</b> Added`);
  }

  swapTransformaion(o, n) {
    this.store.dispatch(new UpdateNodeOrder(o, n));
    this.msg.default('Transformation Nodes Swapped');
  }
}
