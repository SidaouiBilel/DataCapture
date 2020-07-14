import { Component, OnInit } from '@angular/core';
import { EntityModal } from '../entity-modal';
import { DomainService } from '../../services/domain.service';
import { NzModalRef } from 'ng-zorro-antd';



const R_MAX = {type:'MAX_CHECK', name:'Maximum Value Check',parameters:{'max':{type:'integer', label:'Max'}}}
const R_MIN = {type:'MIN_CHECK', name:'Minimun Value Check',parameters:{'min':{type:'integer', label:'Min'}}}
const R_INTERVAL = {type:'INTERVAL_CHECK', name:'Interval Value Check',parameters:{'max':{type:'integer' , label:'Max'}, 'min':{type:'integer', label:'Min'}}}
const R_REFERENCE = {type:'REFRENCE_CHECK', name:'Reference Value Check',parameters:{'refrenceType':{type:'reference',label:'Type'}}}
const R_FORMAT = {type:'FORMAT_CHECK', name:'Format Check',parameters:{'regex':{type:'string',label:'REGEX'}}}
const R_MANDATORY = {type:'EMPTY_CHECK', name:'Empty Cell Check',parameters:{}}

const RULES = [
  R_MAX,
  R_MIN,
  R_INTERVAL,
  R_REFERENCE,
  R_FORMAT,
  R_MANDATORY
]

@Component({
  selector: 'app-field-modal',
  templateUrl: './field-modal.component.html',
  styleUrls: ['./field-modal.component.css']
})
export class FieldModalComponent extends EntityModal implements OnInit {

  RULES_LIST = RULES
  RULES_MAP = RULES.reduce((m,e)=>{m[e.type]=e; return m},{})

  form = [
    { name:'label', 
      field: 'label',
      mandatory: true,
      // onChange: ()=>this.onLabelChanged()
    },
    { name:'Name', 
      field: 'name',
      mandatory: true,
      // type:'text'
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

  current=1

  domain_id
  // onLabelChanged(){
  //   console.log(this.data)
  //   this.data.name = 'kkkkk'
  // }

  constructor(private mr: NzModalRef, private ds:DomainService) {
    super(mr)
   }

  ngOnInit() {
    // this.modalrRef['nzTitle'] = (this.edit)? 'Edit Target Field': 'Create New Target Field'
    this.modalrRef['nzTitle'] = null
    
    super.ngOnInit()
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
      type:rule.type,
    }

    for (let paramKey of this.keys(rule.parameters)){
      let param = rule.parameters[paramKey]
      newRule[param.field] = null
    }

    this.data.rules.push(newRule)
  }

  keys = Object.keys

  index = 0
  onIndexChange(ind){
    console.log(ind)
  }

}
