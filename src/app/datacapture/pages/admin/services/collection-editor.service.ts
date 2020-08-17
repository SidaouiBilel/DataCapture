import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@env/environment';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { DomainService } from './domain.service';
import { DomainConfigModalComponent } from '../modals/domain-config-modal/domain-config-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Domain } from '../models/domain';

@Injectable({
  providedIn: 'root'
})
export class CollectionEditor {

  constructor(private ds: DomainService, private modal: NzModalService) {}

  loading = false;

  openConfig(data, super_domain_id) {
    const edit = data? true : false;
    let obj = new Domain(super_domain_id)
    if (data) {
      obj = {...data};
    }
    console.log(obj)

    const modal = this.modal.create({
      nzTitle: 'Collection Configuration',
      nzFooter:[],
      nzContent: DomainConfigModalComponent,
      nzComponentParams: {
        data: obj,
        edit
      },
    });

    const instance = modal.getContentComponent();
  
    modal.afterClose.subscribe(result => {
      if (result){
        this.load_data()
      }
    });
  }

  showDeleteConfirm(data): void {
    const confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Domain Deletion',
      nzContent: 'This action is irreversible. Once a domain is deleted everything related to this domain will also be erased',
      nzOnOk: () => {
        this.loading = true
        this.ds.deleteDomain(data).subscribe(()=> this.load_data())
      }
    });
  }

  showCopyConfirm(data): void {
    const confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Domain Duplication',
      nzContent: 'This action is irreversible. Target Fields will be duplicated for this collection.',
      nzOnOk: () => {
        this.loading = true
        this.ds.duplicateDomain(data).subscribe(()=> this.load_data())
      }
    });
  }

  load_data(){
    this.updateHierarchy()
  }

  updateHierarchy(){

  }

}
