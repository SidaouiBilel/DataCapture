import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Domain } from '../../models/domain';

@Component({
  selector: 'app-domains-page',
  templateUrl: './domains-page.component.html',
  styleUrls: ['./domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainsPageComponent implements OnInit {
  sub: any;
  super_domain_id = null

  constructor(private route: ActivatedRoute, public ds: DomainService, public modal: NzModalService, private router:Router) { }

  loading_list = [{}]

  domains$ = new BehaviorSubject<any>([])
  loading = false

  displayList = false

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.super_domain_id = params.id;
      this.load_data();
   });
  }

  load_data(){
    this.loading = true,
    this.domains$.next(this.loading_list)
    this.ds.getAllBySuperId(this.super_domain_id).subscribe(dms=> {
      this.loading = false
      this.domains$.next(dms)
    })

  }

  openConfig(data) {
    let edit = data? true:false
    let obj = new Domain(this.super_domain_id)
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
      nzContent: 'This action is irreversible. Once a domain is deleted everything related to this domain will also be erased',
      nzOnOk: () => {
        this.loading = true
        this.ds.deleteDomain(data).subscribe(()=> this.load_data())
      }
    });
  }

  showCopyConfirm(data): void {
    let confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Domain Duplication',
      nzContent: 'This action is irreversible. Target Fields will be duplicated for this collection.',
      nzOnOk: () => {
        this.loading = true
        this.ds.duplicateDomain(data).subscribe(()=> this.load_data())
      }
    });
  }

  getAvatar(d:any){
    return (d.name || ' ')[0]
  }

  navigate(r){
    this.router.navigate(r)
  }

}
