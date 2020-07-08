import { OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';

export class EntityModal implements OnInit {

  @Input() data
  @Input() edit

  @ViewChild('modalFooter',{static:true}) public modalFooter: TemplateRef<any>;

  loading = false

  constructor(protected modalrRef: NzModalRef) {
    
   }

  ngOnInit() {
    this.modalrRef['nzFooter'] = this.modalFooter
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
