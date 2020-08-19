import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router } from '@angular/router';
import { Domain } from 'domain';
import { SuperDomain } from '../../models/super-domain';
import { SuperDomainConfigModalComponent } from '../../modals/super-domain-config-modal/super-domain-config-modal.component';
import { SuperDomainService } from '../../services/super-domain.service';
import { StoreService } from '../../services/store.service';
import { NotificationService } from '@app/core';

@Component({
  selector: 'app-super-domains-page',
  templateUrl: './super-domains-page.component.html',
  styleUrls: ['./super-domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperDomainsPageComponent implements OnInit {

  constructor(
    public ds: SuperDomainService, 
    public modal: NzModalService, 
    private router:Router, 
    public s: StoreService,
    private msg: NotificationService
  ) { 
  }
  
  loading_list = [{}]
  loading = false
  searchTerm
  domains$ = new BehaviorSubject<any>([])




  ngOnInit() {
    this.load_data()
  }

  load_data(){
    this.loading = true;
    this.domains$.next(this.loading_list);
    let msg = this.msg.loading('Loading Domains');
    
    this.ds.get().subscribe((dms)=> {
      this.loading = false;
      this.msg.close(msg);
      this.domains$.next(dms)
    }, err=>{
      this.msg.close(msg)
      this.domains$.next([]);
      this.loading = false;
      this.msg.error('Failed to load Domains')
    })

  }

  openConfig(data) {
    let edit = data? true:false
    data = {...data} || new SuperDomain()

    const modal = this.modal.create({
      nzTitle: 'Domain Configuration',
      nzFooter:[],
      nzContent: SuperDomainConfigModalComponent,
      nzComponentParams: {
        data: data,
        edit: edit
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
    let confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Super Domain Deletion',
      nzContent: 'This action is irreversible. Once a domain is deleted everything related to this domain will also be discarded',
      nzOnOk: () =>
        this.ds.delete(data).subscribe(()=> this.load_data())
    });
  }


  navigate(r){
    this.router.navigate(r)
  }

}
