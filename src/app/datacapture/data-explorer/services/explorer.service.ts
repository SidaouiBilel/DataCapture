import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExplorerService {

  collectionId$ = new BehaviorSubject(null)

  constructor() { }

  setCollection(id){
    this.collectionId$.next(id)
  }
}
