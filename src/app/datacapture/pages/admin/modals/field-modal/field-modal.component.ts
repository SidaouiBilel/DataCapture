import { Component, OnInit } from '@angular/core';
import { EntityModal } from '../entity-modal';
import { DomainService } from '../../services/domain.service';
import { NzModalRef } from 'ng-zorro-antd';
import { DATA_TYPES } from '@app/shared/utils/types';


@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.css']
})
export class FieldModalComponent extends EntityModal implements OnInit {

  RULES_LIST = [];
  RULES_MAP = {};

  form = [
    { name: 'label',
      field: 'label',
      mandatory: true,
    },
    { name: 'Type',
      field: 'type',
      mandatory: true,
      type:'select',
      options: DATA_TYPES,
      onchange:()=>{
        this.data.rules = []
      }
    },
    { name:'Editable',
      field: 'editable',
      type:'checkbox',
    },
    { name:'Mandatory',
      field: 'mandatory',
      type:'checkbox',
    },
    { name:'Description',
      field: 'description',
      mandatory: false,
      type:'textarea'
    }
  ]

  current=1
  domain_id

  constructor(private mr: NzModalRef, private ds:DomainService) {
    super(mr)
   }

  ngOnInit() {
    // this.modalrRef['nzTitle'] = (this.edit)? 'Edit Target Field': 'Create New Target Field'
    this.modalrRef['nzTitle'] = null
    super.ngOnInit()

    this.loadRules()
  }

  reset(){
    this.RULES_LIST = []
    this.RULES_MAP = {}
    this.loading = false
  }

  loadRules(){
    this.loading = true
    this.ds.getDomainChecks(this.domain_id).subscribe((checks:any[])=>{
      this.RULES_LIST = checks
      this.RULES_MAP = this.RULES_LIST.reduce((m,e)=>{m[e.id]=e; return m},{})

      this.loading = false
    },err=> this.reset())
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
      this.ds.saveTargetField(this.domain_id, this.data).subscribe(res=>{
        this.modalrRef.close(true)
      })
    }
  }

  removeRule(ind){
    this.data.rules.splice(ind,1)
  }

  addRule(e, rule){

    this.data.rules = this.data.rules || []

    let newRule = {
      type:rule.id,
    }

    for (let paramKey of this.keys(rule.parameters)){
      let param = rule.parameters[paramKey]
      newRule[param.name] = null
    }

    this.data.rules.push(newRule)
  }

  keys = Object.keys

  index = 0
  onIndexChange(ind){
    console.log(ind)
  }

  onChange(f){
    if (f.onchange){
      f.onchange()
    }
  }

}
