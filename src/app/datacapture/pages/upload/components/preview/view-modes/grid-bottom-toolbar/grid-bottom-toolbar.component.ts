import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransformationHotKeysService } from '../../../transformation/services/transformation-hot-keys.service';
import { shortcutString } from '@app/shared/utils/strings.utils';
import { BehaviorSubject } from 'rxjs';
import { permutation, arrangement } from '@app/shared/utils/arrays.utils';

@Component({
  selector: 'app-grid-bottom-toolbar',
  templateUrl: './grid-bottom-toolbar.component.html',
  styleUrls: ['./grid-bottom-toolbar.component.css']
})
export class GridBottomToolbarComponent implements OnInit, OnDestroy {
  hotkey: any;
  hold: any;

  shiftPressed=new BehaviorSubject(false)
  altPressed=new BehaviorSubject(false)
  controlPressed=new BehaviorSubject(false)

  listeners = []

  constructor(public hotkeys: TransformationHotKeysService) { }
  
  ngOnInit() {
    this.hotkey = shortcutString(this.hotkeys.helpHotkey)
    this.hold = this.hotkeys.helpHoldTime
    
    
    const updateKeys = (event)=>{
      if(event.key === "s" && event.ctrlKey)
        event.preventDefault()

      this.controlPressed.next(event.ctrlKey);
      this.shiftPressed.next(event.shiftKey);
      this.altPressed.next(event.altKey);
    }

    this.listeners = []

    for (let a of arrangement(['control', 'shift', 'alt'])){
      const options = {keys: a.join(".")}
      this.listeners.push(this.hotkeys.addShortcut(options, 'keydown').subscribe(updateKeys))
      this.listeners.push(this.hotkeys.addShortcut(options, 'keyup'  ).subscribe(updateKeys))
    }
  }
  
  ngOnDestroy(): void {
    for (let s of this.listeners){
      s.unsubscribe()
    }
  }
}
