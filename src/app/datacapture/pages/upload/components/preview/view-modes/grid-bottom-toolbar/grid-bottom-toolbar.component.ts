import { Component, OnInit } from '@angular/core';
import { TransformationHotKeysService } from '../../../transformation/services/transformation-hot-keys.service';
import { shortcutString } from '@app/shared/utils/strings.utils';

@Component({
  selector: 'app-grid-bottom-toolbar',
  templateUrl: './grid-bottom-toolbar.component.html',
  styleUrls: ['./grid-bottom-toolbar.component.css']
})
export class GridBottomToolbarComponent implements OnInit {
  hotkey: any;

  constructor(public hotkeys: TransformationHotKeysService) { }

  ngOnInit() {
    this.hotkey = shortcutString(this.hotkeys.helpHotkey)
  }

}
