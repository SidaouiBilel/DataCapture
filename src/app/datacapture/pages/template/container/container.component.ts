import { CloneTemplateComponent } from './../clone-template/clone-template.component';
import { TableTemplateComponent } from './../table-template/table-template.component';
import { TemplateService } from './../service/template.service';
import { FormTemplateComponent } from './../form-template/form-template.component';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { AppState, selectProfile  , NotificationService} from '@app/core';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private ModalS:NzModalService ,
    private notif_S:NotificationService,
    private service:TemplateService) { }

    templates$ :BehaviorSubject<any[]>=new BehaviorSubject([]);
    Profile:any;
    loading=false;
    searchTerm:string;
    ngOnInit() {
    this.store.select(selectProfile).subscribe(res=>{
    this.Profile=res;
    this.load_templates();
    });
    }
    check_templates_has_name(name){
    let listoftemplates_names = this.templates$.value.map(el=>{
      return el.name;
    });
    console.log(listoftemplates_names);
    console.log(listoftemplates_names.indexOf(name));
    return listoftemplates_names.indexOf(name) > -1;
    }
    extract_data(edit=false , editdata=[] , templatename="" , templateid=""){
    const modal :NzModalRef = this.ModalS.create({
    nzTitle:edit ?"EDIT Template" : "ADD Template",
    nzClosable:false,
    nzWrapClassName: 'vertical-center-modal',
    nzWidth: '700px',
    nzContent: FormTemplateComponent,
    nzOkText:edit ?"Save" : "Create",
    nzComponentParams:{
      editdata,
      templatename
    },
    nzOnOk:componentInstance=>{
    let config = modal.getConfig();
    try {
      modal.updateConfig({...config , nzOkLoading:true});
    componentInstance.submitForm();
    if (componentInstance.validateForm.valid) {
      let req=componentInstance.validateForm.value;
      let listoftemplates = componentInstance.listoftemplates;
      if(!edit && this.check_templates_has_name(req.name)){
        //modal.getInstance().nzOkLoading = false;
        this.notif_S.error("Template Name already exist");
        return false;
      }

      
      let finale_req={
        "user":this.Profile.id,
        "name":componentInstance.validateForm.value.name,
        "template":{}
      }
      // let templates= Object.keys(componentInstance.validateForm.controls).filter((e) => {if (e.includes('title')) {return e; } });
      listoftemplates.map((template , index)=>{
        
       let req_Sr = template.count.map((el,i)=>{
          return{
            "sheet":req[template.SHS[i].sheet],
            "range":req[template.SHS[i].range].reduce((accumulator, currentValue) => accumulator+ ":" + currentValue)
          }
        });

        finale_req.template[req[template.title]]= template.count.length==1?  req_Sr[0]:req_Sr;
        
      })

      console.log(finale_req);
      if(!edit){
        this.service.addTemplate(finale_req).subscribe(
          data=>{
            this.notif_S.success(finale_req.name+"Created Successfully");
            modal.close();
            this.reload();
          }
        )        
      }else{
        this.service.editTemplate(finale_req , templateid).subscribe(res=>{
          this.notif_S.success(finale_req.name+" Updated Successfully");
          modal.close();
          this.reload();
        })
      }

    }else {
       this.notif_S.error('Invalid Form');
       setTimeout(() => {   modal.updateConfig({...config , nzOkLoading:true}); }, 1000);
    }
    return false;
    } catch (error) {
      this.notif_S.error('Invalid Form');
      setTimeout(() => {   modal.updateConfig({...config , nzOkLoading:true}); }, 1000);
    }
    }
    })
    }

    viewtemplate(title , templatedata){
      this.ModalS.create({
        nzTitle:title,
        nzClosable:false,
        nzWrapClassName: 'vertical-center-modal',
        nzWidth: 'xXL',
        nzContent: TableTemplateComponent,
        nzCancelText:"close",
        nzOkDisabled:true,
        nzComponentParams:{
          templatedata,
        }
      })
    }


    load_templates(){
    this.loading=true;
    this.service.getTemplates().subscribe(res=>{
      this.templates$.next(res);
      this.loading=false;
      console.log(res);
    })
    }
    reload(){
    this.load_templates();
    }
    //trans template to pass it to the form
    trans_template(template){
      return Object.keys(template).map((el,index)=>{
        let currentel = template[el];
        let count = Array.isArray(currentel) ? currentel.length : 1;
        let countarray = Array.from(Array(count).keys());
        return {
          title: "title:"+index,
          titlevalue:el,
          count:countarray,
          SHS:(Array.isArray(currentel) ?currentel :[currentel]).map((e,i)=>(
                {
                  range: "range:"+index+i,
                  rangevalue:e.range.split(':'),
                  sheetvalue:e.sheet,
                  sheet: "sheet:"+index+i,
                }              
              ))
        
        }
      })
    }
    edittemplate(template){
     let editdata = this.trans_template(template.template);
     this.extract_data(true , editdata , template.name , template._id );
    }
    deletetemplate(id){
      this.loading=true;
      this.service.deleteTemplate(id).subscribe(res=>{
        console.log(res);
        this.notif_S.success("Template Deleted Successfully");
        this.reload();
      } , er=>{
        this.loading=false;
      })
    }

    clonedtemplatename="";
    loading1 = false
    clonetemplate(clonemodaltitle:TemplateRef<{}> , name , template) :void{
      this.clonedtemplatename = name;
      let modal:NzModalRef = this.ModalS.create({
        nzTitle:clonemodaltitle,
        nzClosable:false,
        nzWrapClassName: 'vertical-center-modal',
        nzWidth: 'xXL',
        nzContent: CloneTemplateComponent,
        nzCancelText:"close",
        nzOkText:"Clone",
        nzOkLoading:this.loading1,
        // nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
        nzOnOk:(componentInstance)=>{
          let config = modal.getConfig();
          try{
            componentInstance.submitForm();
            if(componentInstance.validateForm.valid){
              if(this.check_templates_has_name(componentInstance.validateForm.value.name)){
               
                this.notif_S.error("Template Name already exist");
              }else{
              modal.updateConfig({...config , nzOkLoading:true});
              let Newname=componentInstance.validateForm.value.name;
              let req={
                "name":Newname,
                "template":template,
                "user":this.Profile.id,
              }

              this.service.addTemplate(req).subscribe(res=>{
                modal.close();
                this.notif_S.success("Template Cloned Successfully");
                this.reload();
              })
              // console.log(req);
              // modal.close();
              }
              
            }else{
              modal.updateConfig({...config , nzOkLoading:true});
            }
          }catch(er){
            console.log(er);
          }
          return false;

        }
        })
    }

}
