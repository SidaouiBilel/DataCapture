import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit , AfterViewInit} from '@angular/core';
import {NotificationService} from '@app/core';
interface SH{
  sheet:string,
  range:string
}
@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit , AfterViewInit   {

  validateForm: FormGroup;
  listoftemplates:Array<{title:string,count:number[],SHS:SH[]}>=[];
  listoftemplatescopy:Array<{title:string,count:number[],SHS:SH[]}>=[];
  maxtags=2;
  editdata=[];
  templatename = "";
  loading = false;
  constructor(private fb: FormBuilder , private notif_S:NotificationService,) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      name: [this.templatename, [Validators.required]],
    })  
    if(this.editdata.length > 0){
      this.loading = true;
      this.gettemplatedata();
    }
  }
  ngAfterViewInit(){
    setTimeout(()=>{
    this.listoftemplates.push(...this.listoftemplatescopy);
    this.loading = false;
    },500);
  }
  gettemplatedata(){
    this.editdata.map(el=>{
      const control = {
        title: el.title,
        count:el.count,
        SHS:el.SHS.map(el=>(
              {
                range: el.range,
                sheet: el.sheet,
              }          
            ))
      };
      
      this.validateForm.addControl(
        el.title,
        new FormControl(el.titlevalue, Validators.required)
      );  
      this.listoftemplatescopy.push(control);
      el.SHS.map(el=>{
          this.validateForm.addControl(
            el.sheet,
            new FormControl(el.sheetvalue, Validators.required)
          );
      
          this.validateForm.addControl(
            el.range,
            new FormControl( el.rangevalue, Validators.required)
          );
      
      });

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
    let id=this.listoftemplates.length;
    const control = {
      title: "title:"+id,
      count:[0],
      SHS:[{
        range: "range:"+id+0,
        sheet: "sheet:"+id+0,
      }]
    };

    const index = this.listoftemplates.push(control);
    this.validateForm.addControl(
      this.listoftemplates[index - 1].SHS[0].sheet,
      new FormControl(null, Validators.required)
    );

    this.validateForm.addControl(
      this.listoftemplates[index - 1].SHS[0].range,
      new FormControl([], Validators.required)
    );
    this.validateForm.addControl(
      this.listoftemplates[index - 1].title,
      new FormControl(null, Validators.required)
    );
  }
  removeField(i: { title:string,count:number[],SHS:SH[] }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listoftemplates.length >= 1) {
      const index = this.listoftemplates.indexOf(i);
      this.listoftemplates.splice(index, 1);
      // console.log(this.listoftemplates);
      for (const SH of i.SHS) {
        this.validateForm.removeControl(SH.sheet);
        this.validateForm.removeControl(SH.range);        
      }
      this.validateForm.removeControl(i.title);
    }
  }
  addSheet_rating(i: { title:string,count:number[],SHS:SH[] } , controleindex , e: MouseEvent){
    e.preventDefault();

    let currenttemplate = this.listoftemplates[controleindex];

    let new_count = currenttemplate.count[currenttemplate.count.length-1]+1;
    let new_SH:SH = {
      range:"range:"+controleindex+new_count,
      sheet:"sheet:"+controleindex+new_count
    }
    this.validateForm.addControl(
      new_SH.range,
      new FormControl([], Validators.required)
    );
    this.validateForm.addControl(
      new_SH.sheet,
      new FormControl(null, Validators.required)
    );
    
    this.listoftemplates[controleindex].SHS.push(new_SH);
    this.listoftemplates[controleindex].count.push(new_count);

    // console.log(this.listoftemplates)

  }
  removeSheet_rating(i: { title:string,count:number[],SHS:SH[] } , controleindex ,shindex , e: MouseEvent ){
    e.preventDefault();
    // console.log(controleindex ,shindex);
    let currenttemplate = this.listoftemplates[controleindex];
    if(currenttemplate.SHS.length>1){
      
      let deltedSH =  currenttemplate.SHS[shindex];

      this.validateForm.removeControl(deltedSH.range);
      this.validateForm.removeControl(deltedSH.sheet); 


      this.listoftemplates[controleindex].SHS.splice(shindex , 1);
      this.listoftemplates[controleindex].count.splice(shindex , 1);

      // console.log(this.listoftemplates)      
    }else{
      this.notif_S.error("You cant have less than 1 Sheet");
    }

  }
}
