import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { BehaviorSubject } from 'rxjs';
import { Column } from '../../models/column';
import { FieldModalComponent } from '../../modals/field-modal/field-modal.component';
import { Field } from '../../models/field';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-fields-page',
  templateUrl: './fields-page.component.html',
  styleUrls: ['./fields-page.component.css']
})
export class FieldsPageComponent implements OnInit, OnDestroy {
  id: number;
  private sub: any;

  list$ = new BehaviorSubject<any>([])

  columns = [
    new Column('', 'action'),
    new Column('Label', 'label'),
    new Column('Name', 'name'),
    new Column('Description', 'description'),
    new Column('Mandatory', 'mandatory'),
    new Column('Editable', 'editable'),
    // new Column('Category', 'category'),
    new Column('Type', 'type'),
  ];

  constructor(private route: ActivatedRoute, private ds: DomainService, private modal: NzModalService, private router: Router) {}

  onBack(){
    this.router.navigate(['/datacapture/admin']);
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
       this.load_data();
    });

    // this.openConfig(null)
  }

  load_data(){
    this.ds.getTargetFields(this.id).subscribe(fields => {
      this.list$.next(fields);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  openConfig(data) {
    const edit = data ? true : false;
    let obj =  new Field()
    if (data) {
      obj = {...data};
    }

    const modal = this.modal.create({
      nzTitle: null,
      nzFooter: null,
      nzContent: FieldModalComponent,
      nzComponentParams: {
        data: obj,
        edit: edit,
        domain_id: this.id
      },
    });

    const instance = modal.getContentComponent();

    modal.afterClose.subscribe(result => {
      if (result){
        this.load_data();
      }
    });
  }

}
