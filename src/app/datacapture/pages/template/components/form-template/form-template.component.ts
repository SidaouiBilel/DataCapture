import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit , AfterViewInit, ViewChild} from '@angular/core';
import {NotificationService} from '@app/core';
import { NzTabComponent } from 'ng-zorro-antd';
interface SH{
  range:string,
  rangevalue?:string
}
interface sheet{
  name:string,
  id:number
}
@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit , AfterViewInit   {

  validateForm: FormGroup;
  listoftemplates:Array<{id?:string ,sheetIndex?:number,title:string,count:number[],SHS:SH[]}>=[];
  listoftemplatescopy:Array<{id?:string ,sheetIndex?:number,title:string,count:number[],SHS:SH[]}>=[];
  maxtags=2;
  templatename = "";
  loading = false;
  dataInsheets={};
  constructor(private fb: FormBuilder , private notif_S:NotificationService,) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      name: [this.templatename, [Validators.required]],
    })  
    if(Object.keys(this.dataInsheets).length > 0){
      this.tabs = Object.keys(this.dataInsheets).map((el , index)=>({name:el , id:index}));
      this.loading = true;
      this.gettemplatedata();
    }
  }
  ngAfterViewInit(){
    setTimeout(()=>{
    this.listoftemplates.push(...this.listoftemplatescopy);
    console.log(this.listoftemplatescopy);
    this.loading = false;
    },500);
  }
  gettemplatedata(){
    Object.keys(this.dataInsheets)
    .map((e:any , index)=>{
      this.validateForm.addControl(
        "sheet"+index,
        new FormControl(e, Validators.required)
      ); 
      this.dataInsheets[e].map((el , i)=>{
        const control = {
          id:index+""+i,
          sheetIndex:index,
          title: "title:"+index+i,
          count:el.count,
          SHS:el.SHS.map((el , rangeIndex)=>(
                {
                  range: "range:"+index+i+rangeIndex,
                  rangevalue:el.rangevalue
                }          
              ))
        };
        
        this.validateForm.addControl(
          control.title,
          new FormControl(el.titlevalue, Validators.required)
        );  
        control.SHS.map(SH=>{       
            this.validateForm.addControl(
              SH.range,
              new FormControl( SH.rangevalue, Validators.required)
            );
        });

        this.listoftemplatescopy.push(control);
      })
    })
  }
  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

  addField(e?:MouseEvent){
    if(e){
     e.preventDefault(); 
    }
    let length=this.getTemplateListbyindex(this.selectedIndex).length;
    const control = {
      id:this.selectedIndex+""+length,
      sheetIndex:this.selectedIndex,
      title: "title:"+this.selectedIndex+length,
      count:[0],
      SHS:[{
        range: "range:"+this.selectedIndex+length+0
      }]
    };

    this.listoftemplates.push(control);
    this.validateForm.addControl(
      control.SHS[0].range,
      new FormControl([], Validators.required)
    );
    this.validateForm.addControl(
      control.title,
      new FormControl(null, Validators.required)
    );

    console.log(control);
    setTimeout(()=>{
      let tempC = document.getElementById("template-content");
      tempC.scrollTop = tempC.scrollHeight+110;
    } , 200);
  }
  removeField(i: { title:string,count:number[],SHS:SH[] }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listoftemplates.length >= 1) {
      const index = this.listoftemplates.indexOf(i);
      this.listoftemplates.splice(index, 1);
      // console.log(this.listoftemplates);
      for (const SH of i.SHS) {
        // this.validateForm.removeControl(SH.sheet);
        this.validateForm.removeControl(SH.range);        
      }
      this.validateForm.removeControl(i.title);
    }
  }
  addSheet_rating(i: { id:any , sheetIndex:number, title:string,count:number[],SHS:SH[] } , controleindex , e: MouseEvent){
    e.preventDefault();

    let currenttemplate = i;

    let new_count = currenttemplate.count[currenttemplate.count.length-1]+1;
    let new_SH:SH = {
      range:"range:"+i.id+new_count,
      // sheet:""
    }
    this.validateForm.addControl(
      new_SH.range,
      new FormControl([], Validators.required)
    );
    currenttemplate.SHS.push(new_SH);
    currenttemplate.count.push(new_count);

    console.log(currenttemplate);
    this.listoftemplates = this.listoftemplates.map(el=>{
      if(el.id == currenttemplate.id){
        return currenttemplate;
      }
      return el;
    })
  }
  removeSheet_rating(i: { id:any , sheetIndex:number, title:string,count:number[],SHS:SH[] } , controleindex ,shindex , e: MouseEvent ){
    e.preventDefault();
    // console.log(controleindex ,shindex);
    let currenttemplate = i;
    if(currenttemplate.SHS.length>1){
      
      let deltedSH =  currenttemplate.SHS[shindex];

      this.validateForm.removeControl(deltedSH.range);
      // this.validateForm.removeControl(deltedSH.sheet); 


      currenttemplate.SHS.splice(shindex , 1);
      currenttemplate.count.splice(shindex , 1);

      console.log(currenttemplate);
      this.listoftemplates = this.listoftemplates.map(el=>{
        if(el.id == currenttemplate.id){
          return currenttemplate;
        }
        return el;
      })
      // console.log(this.listoftemplates)      
    }else{
      this.notif_S.error("You cant have less than 1 Range");
    }

  }

  tabs :sheet[] = [];
  selectedIndex = 0;
  closeTab(index , id): void {
    this.tabs.splice(index, 1);
    this.listoftemplates.map(el=> {
      if(el.sheetIndex === id){
        el.SHS.map(el=>{
          this.validateForm.removeControl(el.range);
        });
        this.validateForm.removeControl(el.title);
      }
    });
    this.validateForm.removeControl("sheet"+id);
    this.listoftemplates = this.listoftemplates.filter(el=>el.sheetIndex !== id);
    console.log(this.selectedIndex , id);
    if(this.selectedIndex == id){
      // console.log(this.tabs.length > index);
      if(this.tabs.length > index){
        this.selectedIndex = this.tabs[index].id;
        return ;
      }
      this.selectedIndex = 0;
    }
  }

  newTab(): void {
    let max = 0
    if(this.tabs.length>0){
      max = Math.max(...this.tabs.map(el=>el.id))+1;      
    }
    this.tabs.push({name:"sheet "+max , id:max});
    this.validateForm.addControl(
      "sheet"+max,
      new FormControl("sheet "+max, Validators.required)
    );
    console.log(Object.keys(this.validateForm.value).filter((el:string)=>(el.includes("sheet"))))
    // this.selectedIndex = this.tabs.length;
  }
  changeTab(e){
    this.selectedIndex =  e.id;
  }
  getTemplateListbyindex(id){
    return this.listoftemplates.filter(el=>el.sheetIndex === id);
  }
}
