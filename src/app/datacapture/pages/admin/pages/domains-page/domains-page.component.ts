import { Component, OnInit, ViewContainerRef, ChangeDetectionStrategy } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DomainService } from '../../services/domain.service';
import { NzModalService } from 'ng-zorro-antd';
import { DomainConfigModalComponent } from '../../modals/domain-config-modal/domain-config-modal.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Domain } from '../../models/domain';
import { CollectionEditor } from '../../services/collection-editor.service';
import { tap, take } from 'rxjs/operators';

@Component({
  selector: 'app-domains-page',
  templateUrl: './domains-page.component.html',
  styleUrls: ['./domains-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DomainsPageComponent implements OnInit {
  sub: any;
  super_domain_id = null

  constructor(private route: ActivatedRoute, public ds: DomainService, public modal: NzModalService, private router:Router, 
    private editor: CollectionEditor
    ) { }

  loading_list = [{}]

  domains$ = new BehaviorSubject<any>([])
  loading = false

  searchTerm
  
  displayList = true

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
    this.editor.openConfig(data, this.super_domain_id).subscribe(()=> {
      console.log('not listening')
      this.load_data()
    })
  }

  getAvatar(d:any){
    return (d.name || ' ')[0]
  }

  navigate(r){
    this.router.navigate(r)
  }

}
