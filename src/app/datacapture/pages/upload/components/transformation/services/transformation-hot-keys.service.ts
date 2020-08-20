import { Injectable, Inject } from '@angular/core';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NotificationService } from '@app/core';
import { NzModalService } from 'ng-zorro-antd';
import { TransformationPreviewHelpComponent } from '../modals/transformation-preview-help/transformation-preview-help.component';
import { delay, take, withLatestFrom } from 'rxjs/operators';
import { interval, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformationHotKeysService  extends Hotkeys{

  helpModal = null
  helpModalDelay = null
  release$: any;
  press$: any;

  subscriptions = null
  registeredHostkeys$ = new BehaviorSubject([])

  constructor(private _eventManager: EventManager,
    @Inject(DOCUMENT) private _document: Document, private msg: NzModalService) {
    super(_eventManager, _document)
   }

   openHelpModal() {
    if(!this.helpModal && !this.helpModalDelay){
      this.helpModalDelay = interval(0).pipe(take(1), withLatestFrom(this.registeredHostkeys$))
        .subscribe(([timeout ,registered])=>{
        this.helpModal = this.msg.create({
          nzContent: TransformationPreviewHelpComponent, 
          nzWidth: 'fit-content',
          nzComponentParams:{
            shortcuts: registered
          },
          nzClosable:false,
          nzWrapClassName:"modal-bottom-left"
        })
        this.helpModal.nzAfterClose.subscribe(()=>{
          this.helpModal = null; 
          this.helpModalDelay = null;
        })
      })
    }
    
  }
  
  closeHelpModal(){
    if(this.helpModal){
      this.helpModal.close()
    }
    if(this.helpModalDelay){
      this.helpModalDelay.unsubscribe()
    }
    this.helpModal = null; 
    this.helpModalDelay = null;
  }

  register(toRegister = []){
    this.press$ = this.addShortcut({ keys: 'h' }).subscribe(() => {
      this.openHelpModal();
    });

    this.release$ = this.addShortcut({ keys: 'h' }, 'keyup').subscribe(() => {
      this.closeHelpModal();
    });

    
    this.subscriptions = []
    for (let r of toRegister){
      this.subscriptions.push(this.addShortcut({ keys: r.key }).subscribe(r.action))
    }
    this.registeredHostkeys$.next(toRegister)
  }

  unregister(){
    this.press$.unsubscribe()
    this.release$.unsubscribe()

    for (let s of this.subscriptions) s.unsubscribe()
    this.registeredHostkeys$.next([])
  }
}
