import { Component, OnInit } from '@angular/core';
import { EntityModal } from '../entity-modal';
import { DomainService } from '../../services/domain.service';
import { NzModalRef } from 'ng-zorro-antd';

@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.css']
})

export class FieldModalComponent extends EntityModal implements OnInit {

  form = [
    { name:'label', 
      field: 'label',
      mandatory: true,
      onChange: ()=>this.onLabelChanged()
    },
    { name:'Name', 
      field: 'name',
      mandatory: true,
      type:'text'
    },
    { name:'Type', 
      field: 'type',
      mandatory: true,
      type:'select',
      options: [
        {value:'string', label:'String'},
        {value:'double', label:'Double'},
        {value:'int', label:'Integer'},
        {value:'date', label:'Date'},
      ]
    },
    { name:'Category', 
      field: 'category',
      mandatory: true,
      type:'select',
      options: [
        {value:'default', label:'Default'},
        {value:'financial', label:'Financial'},
      ]
    },

    { name:'Description', 
      field: 'description',
      mandatory: false,
      type:'textarea'
    },
  ]

  onLabelChanged(){
    console.log(this.data)
    this.data.name = 'kkkkk'
  }

  constructor(private mr: NzModalRef, private ds:DomainService) {
    super(mr)
   }

  ngOnInit() {
    this.modalrRef['nzTitle'] = (this.edit)? 'Edit Target Field': 'Create New Target Field'
    this.modalrRef['nzFooter'] = this.modalFooter
  }

  canSave(){
    let allowed = true

    for (let f of this.form){
      if (f.mandatory){
        if (!this.data[f.field]){
          allowed = false
        }
      }
    }

    return allowed
  }

  canClose(){
    return !this.loading
  }

  close(){
    this.modalrRef.close(false)
  }

  save(){
    if (this.canSave()){
      this.loading = false
      this.ds.saveDomain(this.data).subscribe(res=>{
        this.modalrRef.close(true)
      })
    }
  }

}
