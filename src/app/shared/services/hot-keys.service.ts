import { Injectable, Inject } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Observable, BehaviorSubject } from 'rxjs';
import { FlashCellsEvent } from '@ag-grid-enterprise/all-modules';

type Options = {
  element: any;
  keys: string;
  preventDefault: boolean;
}

@Injectable({ providedIn: 'root' })
export class Hotkeys {
  defaults: Partial<Options> = {
    element: this.document,
  }
    
  subscriptions = null
  registeredHostkeys$ = new BehaviorSubject([])
  
  constructor(private eventManager: EventManager,
              @Inject(DOCUMENT) private document: Document) {
  }

  addShortcut(options: Partial<Options>, pressType = 'keydown') {
    const merged = { ...this.defaults, ...options };
    const event = (merged.keys)?`${pressType}.${merged.keys}`:`${pressType}`;

    return new Observable(observer => {
      const handler = (e) => {
          e.preventDefault();
          observer.next(e);
      }

      
      const dispose = this.eventManager.addEventListener(
         merged.element, event, handler
      );

      return () => {
        dispose();
      };
    })
  }

  register(toRegister = []){
    this.subscriptions = []
    for (let r of toRegister){
      this.subscriptions.push(this.addShortcut({ keys: r.key }).subscribe(r.action))
    }
    this.registeredHostkeys$.next(toRegister)
  }

  unregister(){
    this.registeredHostkeys$.next([])

    for (let s of this.subscriptions) s.unsubscribe()
  }
}