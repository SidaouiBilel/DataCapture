import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { LoadTransformation, SetPreviewMode } from '../store/transformation.actions';
import { selectActivePipe, selectPreviewMode } from '../store/transformation.selectors';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TranformationService {

  url = environment.transform;
  domainId = null;
  domainPipes$ = new ReplaySubject<any>();
  active$: Observable<any>;
  previewMode$: Observable<any>;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>) {
    this.store.select(selectDomain).subscribe((domainId) => {
      if (domainId) {
        if (this.domainId && (this.domainId !== domainId.id)) {
          this.setActive(null);
        }
      }
      this.domainId = domainId.id;
      this.loadDomainPipes();
    });
    this.active$ = this.store.select(selectActivePipe);
    this.previewMode$ = this.store.select(selectPreviewMode);
  }

  save(nodes, domainId, pipeInfo) {
    const pipe = {
      ...pipeInfo,
      modified_on: new Date(),
      nodes,
      domain_id: domainId,
    };

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
}
