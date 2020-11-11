import { DatalakeModalComponent } from './../datalake-modal/datalake-modal.component';
import { Observable, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ExtractorService } from './../../services/extractor.service';
import { NotificationService } from './../../../../../core/notifications/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-datalake-container',
  templateUrl: './datalake-container.component.html',
  styleUrls: ['./datalake-container.component.css']
})
export class DatalakeContainerComponent implements OnInit {

  loading=false;
  Profile:any;
  Jobs$ :BehaviorSubject<any[]>=new BehaviorSubject([]);
  constructor(private Extract_S:ExtractorService,
    private store: Store<AppState>,
    private ModalS:NzModalService ,
    private notif_S:NotificationService) { }

  ngOnInit() {
    this.store.select(selectProfile).subscribe(
      res=>{
        this.Profile=res;
        this.load_jobs(res.id);
      }
    )
  }

  extract_data(){
    const modal :NzModalRef = this.ModalS.create({
    nzTitle:"Extract Data from datalake",
    nzClosable:false,
    nzWrapClassName: 'vertical-center-modal',
    nzWidth: 'xXL',
    nzContent: DatalakeModalComponent,
    nzOkText:"Create",
    nzComponentParams:{},
    nzStyle:{ top: '50px',marginBottom:'10px' },
    nzOnOk:componentInstance=>{
    try {
    modal.getInstance().nzOkLoading = true;
    componentInstance.submitForm();
    if (componentInstance.validateDataLakeForm.valid) {
        console.log(componentInstance.validateDataLakeForm.value);
        this.LAUNCH_EXTRACTION(componentInstance.validateDataLakeForm.value ).subscribe(
          data=>{
            this.notif_S.success("id "+data["job_id"] , "Created");
            modal.close();
            this.reload();
          }
        )
    } else {
      this.notif_S.error('Invalid Form');
      setTimeout(() => { modal.getInstance().nzOkLoading = false; }, 1000);
    }
    return false;
    } catch (error) {

      
    }
    }
    })
 }
  load_jobs(uid){
    this.loading=true;
      this.Extract_S.GET_ALL_DataLake_connector(uid).subscribe(data=>{
      console.log(data)
      this.Jobs$.next([...data]);
      this.loading=false;
      });
  }
  reload(){
    this.load_jobs(this.Profile.id);
  }
  LAUNCH_EXTRACTION(data){
    return this.Extract_S.LUNCH_extraction_datalake(data , this.Profile.id);
  }

}
