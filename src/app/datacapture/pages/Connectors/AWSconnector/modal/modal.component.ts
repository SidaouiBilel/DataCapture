import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  validateS3connector :FormGroup;
  datalake_types=[
    {
      name:"AWS",
      icon:"amazon"
    },
    {
      name:"AZURE",
      icon:"windows"
    },
    {
      name:"ALIBABA",
      icon:"alibaba"
    },
    {
      name:"IBM"
    },
    {
      name:"ORANGE Cloud"
    },
    {
      name:"GOOGLE Cloud",
      icon:"google"
    }
  ];
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.validateS3connector = this.fb.group({
      "name":[null, [Validators.required]],
      "key":[null, [Validators.required]],
      "secret":[null, [Validators.required]],
      "region":[null, [Validators.required]],
    })
  }
  

  submitForm(): void {
    for (const i in this.validateS3connector.controls) {
      this.validateS3connector.controls[i].markAsDirty();
      this.validateS3connector.controls[i].updateValueAndValidity();
    }
  }

  selecticone(name){
     let result =  this.datalake_types.filter((el,key)=>{
      return el.name === name;
    });
    if(result.length===0){
      return "cloud";
    }else if(!result[0].icon){
      return "cloud";
    }else{
      return result[0].icon;
    }
  }

}
