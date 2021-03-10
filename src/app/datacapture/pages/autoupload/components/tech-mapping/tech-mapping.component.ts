import { TableTemplateComponent } from '../../../template/components/table-template/table-template.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { TemplateService } from './../../../template/service/template.service';
import { BehaviorSubject } from 'rxjs';
import { AutouploadService } from './../../service/autoupload.service';
import { NotificationService } from './../../../../../core/notifications/notification.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tech-mapping',
  templateUrl: './tech-mapping.component.html',
  styleUrls: ['./tech-mapping.component.css']
})
export class TechMappingComponent implements OnInit {

  nzCustomContent=true;
  @Input() dataupload;
  @Input() profile;
  @Output() addoutputs :EventEmitter<any>= new EventEmitter();
  @Output() next :EventEmitter<any>= new EventEmitter();
  @Output() previous :EventEmitter<any>= new EventEmitter();
  listOftypes=[{value:"sql",text:"Database",icon:"database"},{value:"parquet",text:"Parquet"},{value:"csv",text:"CSV",icon:"file-excel"},{value:"json",text:"JSON",icon:"file-text"}];
  listOfSources=[{value:"Database",icon:"database"},{value:"FileSystem",icon:"folder-open"},{value:"Datalake",icon:"cloud"}];
  listOfSelectedValue :any[]=[];
  listOfSelectedSources :any[]=[];
  outputype$:BehaviorSubject<boolean>=new BehaviorSubject(true);
  sectedtemplate;
  listOftemplates$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  templateloaded = false;
  templateskelton = [1,2,3];
  constructor( private ModalS:NzModalService , private notif:NotificationService , private autoS:AutouploadService , private templateS :TemplateService) { }

  ngOnInit() {
    if(this.dataupload.outputs.length>0){
        this.listOfSelectedValue=this.dataupload.outputs;
    }
    this.templateS.getTemplates(this.profile.id).subscribe(res=>{
      this.templateloaded = true;
      this.listOftemplates$.next(res);
    });
  }
  goToOutput(){
    console.log(this.listOfSelectedValue);
  }

  iscsv(){
    return this.dataupload.filename.includes(".csv");
  }

  submitloading=false;
  Next(){
    console.log(this.sectedtemplate)
   if(this.listOfSelectedValue.length===0 ){
     this.notif.warn("Output type is Required !!")
   }else if(!this.iscsv() && !this.sectedtemplate){
     this.notif.warn("Template is Required !!")
   }else{

     this.addoutputs.emit(this.listOfSelectedValue);
     this.submitloading=true;
     let template = this.iscsv() ? {template:false} : {template:true,template_id:this.sectedtemplate};
     this.autoS.auto_upload({
       ...{...this.dataupload , outputs:this.listOfSelectedValue , ...template},
       uid:this.profile.id
     }).subscribe(
       data=>{
         console.log(data);
         this.notif.success("output generated successfully");
         this.next.emit();
         this.submitloading=false;
       },
       er=>{
         this.submitloading=false;
       }
     )
     
   }
  }

  goToimport(){
    this.previous.emit();
  }
  changetype($event){
    if(!this.outputype$.value){
      let index = this.listOfSelectedValue.indexOf($event);
      if(index > -1){
        this.listOfSelectedValue.splice(index , 1);
      }else{
        this.listOfSelectedValue.push($event);
      }     
    }
  }
  changesource($event){
    let index = this.listOfSelectedSources.indexOf($event);
    if(index > -1){
      this.listOfSelectedSources.splice(index , 1);
    }else{
      this.listOfSelectedSources.push($event);
    }

    if(this.listOfSelectedSources.length > 0){
      this.outputype$.next(false);
    }else{
      this.outputype$.next(true);
      this.listOfSelectedValue = [];
    }

  }

  templatechange($event){
    this.sectedtemplate = $event;
    console.log($event);
  }
  viewtemplate(title , templatedata){
    const modal :NzModalRef = this.ModalS.create({
      nzTitle:title,
      nzClosable:false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzContent: TableTemplateComponent,
      nzCancelText:"close",
      nzOkDisabled:true,
      nzComponentParams:{
        templatedata,
      },
      })
  }

}
