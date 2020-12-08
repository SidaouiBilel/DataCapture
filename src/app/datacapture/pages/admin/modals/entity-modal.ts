import { OnInit, Input, ViewChild, TemplateRef, Directive } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

@Directive()
export class EntityModal implements OnInit {

  @Input() data
  @Input() edit

  @ViewChild('modalFooter',{static:true}) public modalFooter: TemplateRef<any>;
  @ViewChild('modalTitle',{static:true}) public modalTitle: TemplateRef<any>;

  loading = false

  constructor(protected modalrRef: NzModalRef) {
    
   }

  ngOnInit() {
    this.modalrRef['nzFooter'] = this.modalFooter || null
    this.modalrRef['nzTitle'] = this.modalTitle || null
  }

  canSave(){
    return true
  }

  canClose(){
    return true
  }

  close(){
    this.modalrRef.close(false)
  }

  save(){
    this.modalrRef.close(true)
  }

}
