import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router } from '@angular/router';
import { Domain } from 'domain';
import { SuperDomain } from '../../models/super-domain';
import { SuperDomainConfigModalComponent } from '../../modals/super-domain-config-modal/super-domain-config-modal.component';

@Component({
  selector: 'app-super-domains-page',
  templateUrl: './super-domains-page.component.html',
  styleUrls: ['./super-domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuperDomainsPageComponent implements OnInit {

  constructor(public ds: DomainService, public modal: NzModalService, private router:Router) { }

  loading_list = [{}]

  domains$ = new BehaviorSubject<any>([])
  loading = false

  displayList = true

  ngOnInit() {
    this.load_data()
  }

  load_data(){
    this.loading = true,
    this.domains$.next(this.loading_list)
    this.ds.getAllSuper().subscribe(dms=> {
      this.loading = false
      this.domains$.next(dms)
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
        new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log('Oops errors!'))
    });
  }

  getAvatar(d:any){
    return (d.name || ' ')[0]
  }

  navigate(r){
    this.router.navigate(r)
  }

}
