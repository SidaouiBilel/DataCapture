import { DBconnector } from '../../models/DBconnector.model'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modaldbconnectors',
  templateUrl: './modaldbconnectors.component.html',
  styleUrls: ['./modaldbconnectors.component.css']
})
export class ModaldbconnectorsComponent implements OnInit {

  bd_types :String[]=["mysql","sqlserver"];
  layout :String="vertical";
  validateDataBaseConnector :FormGroup;
  data :DBconnector;

  constructor(private fb : FormBuilder) { }

  pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
  // '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  // '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  // '(\\#[-a-z\\d_]*)?$','i'
  ); // fragment locator
  
  validatorurl = (control :FormControl) :{ [s: string]: boolean } => {
    if(!control.value){
      return {required: true};
    }else if(!this.pattern.test(control.value)){
          return {error : true};
    }
    return {};
  }


  ngOnInit() {

   this.validateDataBaseConnector=this.fb.group({
    "name":[this.data ? this.data.name  : null, [Validators.required]],
    "db_host":[this.data ? this.data.db_host  : null, [Validators.required , this.validatorurl]],
    "db_uid": [this.data ?this.data.db_uid : null, [Validators.required]],
    "db_pwd": [this.data ?this.data.db_pwd :null, [Validators.required]],
    "type":[this.data ? this.data.type : null, [Validators.required]],
    "db_name": [this.data ? this.data.db_name :null, [Validators.required]]
   })
    
  }


  submitForm(): void {
    for (const i in this.validateDataBaseConnector.controls) {
      this.validateDataBaseConnector.controls[i].markAsDirty();
      this.validateDataBaseConnector.controls[i].updateValueAndValidity();
    }
  }

}
