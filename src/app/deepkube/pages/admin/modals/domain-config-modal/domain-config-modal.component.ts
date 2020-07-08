import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-domain-config-modal',
  templateUrl: './domain-config-modal.component.html',
  styleUrls: ['./domain-config-modal.component.css']
})
export class DomainConfigModalComponent extends EntityModal implements OnInit {


  constructor(private mr: NzModalRef, private ds:DomainService) {
    super(mr)
   }

  ngOnInit() {
    this.modalrRef['nzFooter'] = this.modalFooter
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
      this.ds.saveDomain(this.data).subscribe(res=>{
        this.modalrRef.close(true)
      })
    }
  }

}
