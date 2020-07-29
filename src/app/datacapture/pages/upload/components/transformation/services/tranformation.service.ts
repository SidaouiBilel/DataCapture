import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { NzDrawerService, NzModalService } from 'ng-zorro-antd';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { selectDomain } from '../../../store/selectors/import.selectors';
import { LoadTransformation, UpdateTransNode } from '../store/transformation.actions';
import { selectActivePipe } from '../store/transformation.selectors';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranformationService {

  url = environment.transform

  domain_id = null
  
  domain_pipes$ = new ReplaySubject<any>()
  active$;

  constructor(
    private http: HttpClient, 
    private drawerService: NzDrawerService, 
    private modalService: NzModalService,
    private store:Store<AppState>,
    ) { 
    this.store.select(selectDomain).subscribe((domain_id)=> {
      this.domain_id = domain_id
      this.setActive(null)
      this.loadDomainPipes()
    }) 
    this.active$ = this.store.select(selectActivePipe) 
  }

  save(nodes, domain_id, pipe_info){
    const pipe = {
      ...pipe_info,
      modified_on: new Date(),
      nodes: nodes,
      domain_id: domain_id,
    }

    return this.http.post(`${this.url}`,pipe).pipe(
      tap(()=> this.loadDomainPipes()),
      tap((active)=> {
        console.log({active})
        this.setActive(active)
      }),
    )
  }

  delete(pipe_info){
    return this.http.request('DELETE', `${this.url}`,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        }),
        body: {...pipe_info, modified_on: new Date()}
    }).pipe(
      tap(()=> this.loadDomainPipes()),
      tap((active)=> {
        this.setActive(null)
      }),
    )
  }

  setActive(active){
    this.store.dispatch(new LoadTransformation(active))
  }

  get(domain_id){
    return this.http.get(`${this.url}${domain_id}`)
  }

  getInContext(){
    return this.get(this.domain_id)
  }

  loadDomainPipes(){
    this.getInContext().subscribe(res=> this.domain_pipes$.next(res))
  }
}
