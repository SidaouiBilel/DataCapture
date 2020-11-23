import { TemplateService } from './../service/template.service';
import { FormTemplateComponent } from './../form-template/form-template.component';
import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
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
    searchDE:String;
    loading=false;
    ngOnInit() {
    this.store.select(selectProfile).subscribe(res=>{
    this.Profile=res;
    this.load_templates();
    });
    }

    extract_data(){
    const modal :NzModalRef = this.ModalS.create({
    nzTitle:"ADD Template",
    nzClosable:false,
    nzWrapClassName: 'vertical-center-modal',
    nzWidth: 'xXL',
    nzContent: FormTemplateComponent,
    nzOkText:"Create",
    nzComponentParams:{},
    nzStyle:{ top: '50px',marginBottom:'10px' },
    nzOnOk:componentInstance=>{
    try {
    // modal.getInstance().nzOkLoading = true;
    componentInstance.submitForm();
    if (componentInstance.validateForm.valid) {
      let req=componentInstance.validateForm.value;
      let listoftemplates = componentInstance.listoftemplates;

      
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
      this.service.addTemplate(finale_req).subscribe(
        data=>{
          this.notif_S.success("Created");
          modal.close();
          this.reload();
        }
      )
    }else {
       this.notif_S.error('Invalid Form');
       setTimeout(() => { modal.getInstance().nzOkLoading = false; }, 1000);
    }
    return false;
    } catch (error) {

      this.notif_S.error('Invalid Form');
      setTimeout(() => { modal.getInstance().nzOkLoading = false; }, 1000);
    }
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

}
