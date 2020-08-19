import { Injectable, Inject } from '@angular/core';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { NotificationService } from '@app/core';
import { NzModalService } from 'ng-zorro-antd';
import { TransformationPreviewHelpComponent } from '../modals/transformation-preview-help/transformation-preview-help.component';
import { delay, take } from 'rxjs/operators';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransformationHotKeysService  extends Hotkeys{

  helpModal = null
  helpModalDelay = null
  release$: any;
  press$: any;

  subscriptions = null

  constructor(private _eventManager: EventManager,
    @Inject(DOCUMENT) private _document: Document, private msg: NzModalService) {
    super(_eventManager, _document)
   }

   openHelpModal() {
    if(!this.helpModal && !this.helpModalDelay){
      this.helpModalDelay = interval(1000).pipe(take(1)).subscribe(()=>{
        this.helpModal = this.msg.create({nzContent: TransformationPreviewHelpComponent, nzClosable:false})
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

  register(subscriptions = []){
    this.press$ = this.addShortcut({ keys: 'shift' }).subscribe(() => {
      this.openHelpModal();
    });

    this.release$ = this.addShortcut({ keys: 'shift' }, 'keyup').subscribe(() => {
      this.closeHelpModal();
    });

    this.subscriptions = subscriptions
  }

  unregister(){
    this.press$.unsubscribe()
    this.release$.unsubscribe()

    for (let s of this.subscriptions) s.unsubscribe()
  }
}
