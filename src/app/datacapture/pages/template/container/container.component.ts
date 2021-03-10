import { CloneTemplateComponent } from '../components/clone-template/clone-template.component';
import { TableTemplateComponent } from '../components/table-template/table-template.component';
import { TemplateService } from '../service/template.service';
import { FormTemplateComponent } from '../components/form-template/form-template.component';
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
    searchTerm:string;
    ngOnInit() {
      this.store.select(selectProfile).subscribe(res=>{
          this.Profile=res;
          this.load_templates(res.id);
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
    extract_data(edit=false  , templatename="" , templateid="" , dataInsheets={}){
    const modal :NzModalRef = this.ModalS.create({
    nzTitle:edit ?"EDIT Template" : "ADD Template",
    nzClosable:false,
    nzWrapClassName: 'vertical-center-modal',
    nzWidth: '700px',
    nzContent: FormTemplateComponent,
    nzOkText:edit ?"Save" : "Create",
    nzComponentParams:{
      // editdata,
      templatename,
      dataInsheets
    },
    nzOnOk:componentInstance=>{
    let config = modal.getConfig();
    try {
      modal.updateConfig({...config , nzOkLoading:true});
    componentInstance.submitForm();
    if (componentInstance.validateForm.valid) {
      let req=componentInstance.validateForm.value;
      let listoftemplates = componentInstance.listoftemplates;
      let sheets = componentInstance.tabs;
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
            "sheet":sheets[template.sheetIndex].name,
            "range":req[template.SHS[i].range].reduce((accumulator, currentValue) => accumulator+ ":" + currentValue)
          }
        });

        finale_req.template[req[template.title]]= template.count.length==1?  req_Sr[0]:req_Sr;
        
      })

      if(Object.keys(finale_req.template).length==0){
        this.notif_S.error("Template can't be empty !");
        modal.updateConfig({...config , nzOkLoading:false});
        return false; 
      }
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
       setTimeout(() => {   modal.updateConfig({...config , nzOkLoading:false}); }, 1000);
    }
    return false;
    } catch (error) {
      this.notif_S.error('Invalid Form');
      setTimeout(() => {   modal.updateConfig({...config , nzOkLoading:false}); }, 1000);
    }
    }
    })
    }

    viewtemplate(index){
      let {name , template} = this.templates$.value[index];
      this.ModalS.create({
        nzTitle:name,
        nzClosable:false,
        nzWrapClassName: 'vertical-center-modal',
        nzWidth: 'xXL',
        nzContent: TableTemplateComponent,
        nzCancelText:"close",
        nzOkDisabled:true,
        nzComponentParams:{
          templatedata:template,
        }
      })
    }


    load_templates(id){
    const loader = this.notif_S.loading('Loading templates...');
    this.service.getTemplates(id).subscribe(res=>{
      this.templates$.next(res);
      console.log(res); 
      this.notif_S.close(loader);
    }, (err) => {this.notif_S.close(loader);})
    }
    reload(){
    this.load_templates(this.Profile.id);
    }
    //trans template to pass it to the form
    trans_template(template){
      return Object.keys(template).map((el,index)=>{
        let currentel = template[el];
        let count = Array.isArray(currentel) ? currentel.length : 1;
        let countarray = Array.from(Array(count).keys());
        let sheet = Array.isArray(currentel) ? currentel[0].sheet : currentel.sheet;
        return {
          title: "title:"+index,
          titlevalue:el,
          count:countarray,
          sheet:sheet,
          SHS:(Array.isArray(currentel) ?currentel :[currentel]).map((e,i)=>(
                {
                  rangevalue:e.range.split(':')
                }              
              ))
        
        }
      })
    }

    trans_template_whith_sheet(template){
      let trans = this.trans_template(template);
      let result ={};
      trans.map(el=>{
        let sheet = el.sheet;
        if(result[sheet]){
          result[sheet] = [ ...result[sheet] , el];
        }else{
          result[sheet] = [el];
        }
      })
      return result;
    }
    edittemplate(template){
    //  let editdata = this.trans_template(template.template);
     let dataInsheets = this.trans_template_whith_sheet(template.template);
     console.log(template.name);
     this.extract_data(true , template.name , template._id , dataInsheets);
    }
    deletetemplate(id){
      const loader = this.notif_S.loading('Deleting tepmlate...');
      this.service.deleteTemplate(id).subscribe(res=>{
        console.log(res);
        this.notif_S.success("Template Deleted Successfully");
        this.notif_S.close(loader);
        this.reload();
      } , er=>{
        this.notif_S.close(loader);
      })
    }

    clonedtemplatename="";
    loading1 = false
    clonetemplate(params) :void{
      let {templateref , data} = params;
      let {template , name} = data;
      console.log(params);
      this.clonedtemplatename = name;
      let modal:NzModalRef = this.ModalS.create({
        nzTitle:templateref,
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
              console.log(req);
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
