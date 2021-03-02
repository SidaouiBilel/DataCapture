import { NotificationService } from './../../../../../core/notifications/notification.service';
import { UploadChangeParam } from 'ng-zorro-antd/upload';
import {  AutouploadService} from '../../service/autoupload.service';;
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AppState, selectProfile } from '@app/core';
import { env as environment } from '@app/env.service';
@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {

  importTypes=[
    "Extracted files",
    "Filesystem",
    // "Database",
    // "Datalake"
  ];
  Importtype$ :BehaviorSubject<String>  = new BehaviorSubject("Extracted files");
  UserFiles$  :BehaviorSubject<any[]>   = new BehaviorSubject([]);
  selectedtype="Extracted files";
  Profile:any;
  constructor(private store:Store<AppState> ,
     private FI_S:AutouploadService ,
     private notif:NotificationService) { }

  url:string;
  @Input() dataupload;
  @Output() addfile :EventEmitter<any>= new EventEmitter();
  @Output() next :EventEmitter<any>= new EventEmitter();
  SuccessMessage :string="";
  ngOnInit() { 
    this.store.select(selectProfile).subscribe(res=>{
      let id = "995dd4c3-1366-48c6-915b-a994df119831";
      this.Profile=res;
      this.load_extracted_files(res.id);
      this.url=environment.upload+"/import/"+res.id;
    });
    this.SuccessMessage =this.dataupload.filename!='' ?this.dataupload.filename+" imported successfully" :"";

  }

  selectimporttype(e){
    this.Importtype$.next(e);
    console.log(e)
  }
  resetselected(){
    this.Importtype$.next("");
    this.selectedtype="";
  }
  loading=false;
  load_extracted_files(uid){
    this.loading=true;
    this.FI_S.get_extracted_files(uid).subscribe(
      data=>{
        this.UserFiles$.next([...data]);
        this.loading=false;
      }
    )
  }
  reload(){
    this.load_extracted_files(this.Profile.id);
  }

  fileloading=false;
  handleChange({file}:UploadChangeParam): void{
    const status=file.status;
    
    if(status === 'uploading'){
      this.fileloading=true;
    }
    if (status === 'done') {
      console.log(file.response)
      if(file.response.uploaded){
        this.notif.success("Your file has been uploaded successfully.");
        this.fileloading=false;
        this.addfile.emit(file.name);
        this.SuccessMessage=file.name+" imported successfully";        
      }else{
        this.notif.error("ERROR");
        this.fileloading=false;
      }

    }else if (status === 'error') {
      this.notif.error("ERROR.");
      this.fileloading=false;
    }
  }

  auto_import_file(name){
    this.SuccessMessage=name+" imported successfully";
    this.addfile.emit(name);
  }
  Next(){
    if(this.dataupload.filename != ''){
      this.next.emit();
    }else{
      this.notif.warn("You need to import a file",2000);
    }
  }

}
