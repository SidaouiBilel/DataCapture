import { DBconnectorsService } from './../../services/dbconnectors.service';
import { AppState , selectProfile , NotificationService} from '@app/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { DBconnector } from '../../models/DBconnector.model'
import { Component, OnInit } from '@angular/core';
import {ModaldbconnectorsComponent} from "../modaldbconnectors/modaldbconnectors.component";
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-create-dbconnectors',
  templateUrl: './create-dbconnectors.component.html',
  styleUrls: ['./create-dbconnectors.component.css']
})
export class CreateDBconnectorsComponent implements OnInit {

  searchDBC:String='';
  Profile$ :Observable<any>;
  profile :any;
  reload$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor(private ModalS:NzModalService , 
              private store :Store<AppState>,
              private DBC_S :DBconnectorsService,
              private notif_S:NotificationService) { 

    this.Profile$=this.store.select(selectProfile);
    this.Profile$.subscribe(res=>{this.profile=res;});


  }

  
  ngOnInit() {}

  addDBconnector(edit=false , data?:DBconnector){
    const modal :NzModalRef = this.ModalS.create({
      nzTitle:(edit ?"Edit " :"ADD ")+"DataBase Connector",
      nzClosable:false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: ModaldbconnectorsComponent,
      nzOkText: edit ?"Edit" :"ADD",
      nzComponentParams:{data},
      nzOnOk:componentInstance=>{
        try {
          modal.getInstance().nzOkLoading = true;
          componentInstance.submitForm();
          if (componentInstance.validateDataBaseConnector.valid) {
              console.log(componentInstance.validateDataBaseConnector.value);
              this.addDBC(componentInstance.validateDataBaseConnector.value , edit).subscribe(
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

  updateDBC(data :DBconnector ){
    this.addDBconnector(true , data);
  }
  addDBC(data , edit){
    if(!edit){
      return  this.DBC_S.Add_DB_connector(data , this.profile.id)    
    }
  }
  reload(){
    this.reload$.next(true);
  }

}
