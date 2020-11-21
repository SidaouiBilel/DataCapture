import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-template',
  templateUrl: './form-template.component.html',
  styleUrls: ['./form-template.component.css']
})
export class FormTemplateComponent implements OnInit {

  validateForm: FormGroup;
  listoftemplates:Array<{sheet:string,range:string,title:string}>=[];
  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],

    })
  }
  submitForm(): void {
    // tslint:disable-next-line: forin
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
      sheet: "sheet:"+id,
      range: "range:"+id,
      title: "title:"+id
    };
    const index = this.listoftemplates.push(control);
    this.validateForm.addControl(
      this.listoftemplates[index - 1].sheet,
      new FormControl(null, Validators.required)
    );
    this.validateForm.addControl(
      this.listoftemplates[index - 1].range,
      new FormControl([], Validators.required)
    );
    this.validateForm.addControl(
      this.listoftemplates[index - 1].title,
      new FormControl(null, Validators.required)
    );
    
  }
  removeField(i: { sheet: string, range: string , title:string }, e: MouseEvent): void {
    e.preventDefault();
    if (this.listoftemplates.length >= 1) {
      const index = this.listoftemplates.indexOf(i);
      this.listoftemplates.splice(index, 1);
      console.log(this.listoftemplates);
      this.validateForm.removeControl(i.sheet);
      this.validateForm.removeControl(i.range);
    }
  }
}
