import { FomDbComponent } from './../fom-db/fom-db.component';
import { ExtractorService } from './../../services/extractor.service';
import { NotificationService } from './../../../../../core/notifications/notification.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-extract-db',
  templateUrl: './extract-db.component.html',
  styleUrls: ['./extract-db.component.css']
})
export class ExtractDBComponent implements OnInit {
  constructor(private Extract_S:ExtractorService,
              private store: Store<AppState>,
              private ModalS:NzModalService ,
              private notif_S:NotificationService) { }

Jobs$ :BehaviorSubject<any[]>=new BehaviorSubject([]);
Profile:any;
searchDE:String;
loading=false;
ngOnInit() {
    this.store.select(selectProfile).subscribe(res=>{
    this.Profile=res;
    this.load_jobs(res.id);
    });
}

extract_data(){
    const modal :NzModalRef = this.ModalS.create({
    nzTitle:"ADD DataBase Connector",
    nzClosable:false,
    nzWrapClassName: 'vertical-center-modal',
    nzWidth: 'xXL',
    nzContent: FomDbComponent,
    nzOkText:"Create",
    nzComponentParams:{},
    nzStyle:{ top: '50px',marginBottom:'10px' },
    nzOnOk:componentInstance=>{
    try {
    modal.getInstance().nzOkLoading = true;
    componentInstance.submitForm();
    if (componentInstance.validateDataBaseForm.valid) {
        console.log(componentInstance.validateDataBaseForm.value);
        this.LAUNCH_EXTRACTION(componentInstance.validateDataBaseForm.value ).subscribe(
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
      this.Extract_S.GET_ALL_USER_JOB(uid).subscribe(data=>{
      console.log(data)
      this.Jobs$.next([...data,{
      "job_id": "2b9b6cefc6214d5a9ca2a257e022d8bd",
      "status": "OK"
      },
      {
      "job_id": "2b9b6cefc6214d5a9ca2a257e022d8bd",
      "status": ""
      }]);
      this.loading=false;
      });
  }
  reload(){
      this.load_jobs(this.Profile.id);
  }
  LAUNCH_EXTRACTION(data){
       return this.Extract_S.LUNCH_extraction(data, this.Profile.id);    
  }


}
