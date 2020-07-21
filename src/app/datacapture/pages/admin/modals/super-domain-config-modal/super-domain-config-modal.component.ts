import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-super-domain-config-modal',
  templateUrl: './super-domain-config-modal.component.html'
})
export class SuperDomainConfigModalComponent extends EntityModal implements OnInit {


  constructor(private mr: NzModalRef, private ds:DomainService) {
    super(mr)
   }

  ngOnInit() {
    super.ngOnInit()
  }

  canSave(){
    return this.data.name
  }

  canClose(){
    return !this.loading
  }

  close(){
    this.modalrRef.close(false)
  }

  save(){
    if (this.canSave()){
      this.loading = false
      this.ds.saveSuperDomain(this.data).subscribe(res=>{
        this.modalrRef.close(true)
      })
    }
  }

}
