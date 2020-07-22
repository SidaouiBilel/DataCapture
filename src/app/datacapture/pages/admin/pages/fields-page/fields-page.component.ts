import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '../../services/domain.service';
import { BehaviorSubject } from 'rxjs';
import { Column } from '../../models/column';
import { FieldModalComponent } from '../../modals/field-modal/field-modal.component';
import { Field } from '../../models/field';
import { NzModalService } from 'ng-zorro-antd';
import { TargetFieldsService } from '../../services/fields.service';
import { NotificationService } from '@app/core';

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

  loading
  uploadURI

  constructor(private notification: NotificationService, private route: ActivatedRoute, private ds: TargetFieldsService, private modal: NzModalService, private router: Router) {}

  onBack(){
    this.router.navigate(['/datacapture/admin/category', this.id]);
  }


  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params.id;
       this.load_data();
    });

    // this.openConfig(null)
  }

  load_data(){
    this.loading = true
    this.uploadURI = this.ds.fileUploadUrl(this.id)
    this.ds.get(this.id).subscribe(fields => {
      this.list$.next(fields);
      this.loading = false
    }, err=> this.loading = false);
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

  showDeleteConfirm(data): void {
    let confirmModal = this.modal.confirm({
      nzTitle: 'Confirm Target Field Deletion',
      nzContent: 'This action is irreversible.',
      nzOnOk: () =>
        this.ds.delete(this.id, data).subscribe(()=> this.load_data())
    });
  }

  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.loading = true
    }
    if (info.file.status === 'done') {
      this.notification.success(`Fields updated successfully from file ${info.file.name}.`);
      this.load_data()
    } else if (info.file.status === 'error') {
      this.notification.error(`Failed to update.`);
      this.load_data()
    }
  }

}
