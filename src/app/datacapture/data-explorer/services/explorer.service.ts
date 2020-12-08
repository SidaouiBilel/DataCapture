import { Injectable } from '@angular/core';
import { DomainService } from '@app/datacapture/pages/admin/services/domain.service';
import { SuperDomainService } from '@app/datacapture/pages/admin/services/super-domain.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { iif } from 'rxjs/internal/observable/iif';
import { map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  collectionId$ = new BehaviorSubject(null)
  collection$
  domain$

  constructor(private domains: DomainService, private superDomain: SuperDomainService) { 
    this.collection$ = this.collectionId$.pipe(
      switchMap((id)=>this.domains.getById(id)),
      map((col:any)=>(col.id)?col: null)
      )
    // this.domain$ = this.collection$.pipe(switchMap((collection:any)=>this.superDomain.getById(collection.super_domain_id)))
  }

  setCollection(id){
    this.collectionId$.next(id)
  }
}
