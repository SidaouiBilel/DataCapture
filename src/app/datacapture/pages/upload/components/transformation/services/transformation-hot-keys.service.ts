import { Injectable, Inject } from '@angular/core';
import { Hotkeys } from '@app/shared/services/hot-keys.service';
import { EventManager } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TransformationHotKeysService  extends Hotkeys {
  constructor(private _eventManager: EventManager, @Inject(DOCUMENT) private _document: Document) {
    super(_eventManager, _document);
   }
}
