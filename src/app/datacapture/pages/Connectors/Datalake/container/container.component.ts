import { Observable, BehaviorSubject } from 'rxjs';
import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { S3connectorsService } from './../../services/s3connectors.service';
import { Store } from '@ngrx/store';
import { AppState , selectProfile , NotificationService} from '@app/core';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  searchDLC :string;
  profile$:Observable<any>;
  profile:any;
  constructor(private S3_S: S3connectorsService,
    private ModalS:NzModalService , 
    private store :Store<AppState>,
    private notif_S:NotificationService) {
    
    this.store.select(selectProfile).subscribe(
       data=>{
        this.profile=data;
    });
    }


  addDLconnector(){
      const modal :NzModalRef=this.ModalS.create({
      nzTitle:"ADD Data Lake Connector",
      nzClosable:false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: ModalComponent,
      nzOkText: "ADD",
      nzOnOk:componentInstance=>{
        try {
          modal.getInstance().nzOkLoading = true;
          componentInstance.submitForm();
          if (componentInstance.validateS3connector.valid) {
              console.log(componentInstance.validateS3connector.value);
              this.addS3C(componentInstance.validateS3connector.value ).subscribe(
                data=>{
                  this.notif_S.success(data["connector_name"] ,data["message"]);
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
  ngOnInit() {}

  reload$ : BehaviorSubject<boolean> = new BehaviorSubject(false);
  reload(){
    this.reload$.next(true);
  }
  addS3C(data){
    return this.S3_S.Add_S3_connector(data , this.profile.id);
  }
}
