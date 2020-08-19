import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { TRANSFORMATIONS } from '../../transformations/transformers';
import { shortcutString } from '@app/shared/utils/strings.utils';

@Component({
  selector: 'app-transformation-preview-help',
  templateUrl: './transformation-preview-help.component.html',
  styleUrls: ['./transformation-preview-help.component.css']
})
export class TransformationPreviewHelpComponent implements OnInit {

  shortcuts = []

  @ViewChild('modalFooter',{static:true}) public modalFooter: TemplateRef<any>;
  @ViewChild('modalTitle',{static:true}) public modalTitle: TemplateRef<any>;

  constructor(private modalrRef: NzModalRef) { }

  ngOnInit() {
    // this.modalrRef['nzTitle'] = this.modalTitle
    // this.modalrRef['nzFooter'] = this.modalFooter
    this.modalrRef['nzTitle'] = null
    this.modalrRef['nzFooter'] = null

    this.shortcuts = TRANSFORMATIONS.map(t=>({
      name: t.label,
      description: t.description,
      shortcut : shortcutString(t.shortcut),
      icon : t.icon,
      iconRotation : t.icon_rotation,
    }))
    this.shortcuts.push({
      name: 'Save and Apply',
      shortcut : shortcutString('shift.s'),
      icon : 'save',
    })
    this.shortcuts.push({
      name: 'Copy',
      shortcut : shortcutString('ctrl.c'),
      icon : 'copy',
    })

  }


}
