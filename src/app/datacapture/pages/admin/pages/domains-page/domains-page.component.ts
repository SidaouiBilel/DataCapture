import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domains-page',
  templateUrl: './domains-page.component.html',
  styleUrls: ['./domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainsPageComponent implements OnInit {

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
    this.ds.getAll().subscribe(dms=> {
      this.loading = false
      this.domains$.next(dms)
    })

  }

  openConfig(data) {
    let edit = data? true:false
    data = {...data} || {}

    const modal = this.modal.create({
      nzTitle: 'Domain Configuration',
      nzFooter:[],
      nzContent: DomainConfigModalComponent,
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
      nzTitle: 'Confirm Domain Deletion',
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
