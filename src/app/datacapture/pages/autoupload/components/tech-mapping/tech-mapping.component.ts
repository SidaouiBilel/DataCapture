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
  listOftypes=[{value:"sql",text:"Database"},{value:"parquet",text:"Parquet"},{value:"csv",text:"CSV"},{value:"json",text:"JSON"}];
  listOfSources=[{value:"Database",icon:"database"},{value:"FileSystem",icon:"folder-open"},{value:"Datalake",icon:"container"}];
  listOfSelectedValue :any[]=[];
  listOfSelectedSources :any[]=[];
  outputype$:BehaviorSubject<boolean>=new BehaviorSubject(true);
  sectedtemplate;
  listOftemplates$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  constructor(private notif:NotificationService , private autoS:AutouploadService , private templateS :TemplateService) { }

  ngOnInit() {
    if(this.dataupload.outputs.length>0){
        this.listOfSelectedValue=this.dataupload.outputs;
    }
    this.templateS.getTemplates().subscribe(res=>{
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
   if(this.listOfSelectedValue.length===0 || !this.iscsv() && !this.sectedtemplate){
     this.notif.warn("You need to Select Output type !!")
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
  changesource($event){
    if($event.length==1 && $event[0]=="Database"){
      this.listOfSelectedValue=["sql"];
      this.outputype$.next(true);
    }else if($event.length==0){
      this.listOfSelectedValue=[];
      this.outputype$.next(true);
    }else{
      this.outputype$.next(false); 
    }
  }

}
