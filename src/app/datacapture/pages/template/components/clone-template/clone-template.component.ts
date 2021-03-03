import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {NotificationService} from '@app/core';

@Component({
  selector: 'app-clone-template',
  templateUrl: './clone-template.component.html',
  styleUrls: ['./clone-template.component.css']
})
export class CloneTemplateComponent implements OnInit {

  constructor(private fb: FormBuilder , private notif_S:NotificationService) { }
  temlate_cloned={};
  validateForm: FormGroup = this.fb.group({
    'name':[null, [Validators.required]],
  });
  ngOnInit() {
  }
  submitForm(){
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }

}
