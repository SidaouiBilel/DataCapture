import { Component, OnInit } from '@angular/core';
import { camelize } from '@app/shared/utils/strings.utils';
import { DATA_TYPES } from '@app/shared/utils/types';
import { NzModalRef } from 'ng-zorro-antd';
import { EntityModal } from '../../../modals/entity-modal';
import { ReferenceService } from '../reference.service';

@Component({
  selector: 'app-refrence-type-editor',
  templateUrl: './refrence-type-editor.component.html',
  styleUrls: ['./refrence-type-editor.component.css']
})
export class RefrenceTypeEditorComponent extends EntityModal implements OnInit {

  constructor(modalrRef: NzModalRef, private service:ReferenceService) { 
    super(modalrRef)
  }

  types = DATA_TYPES

  ngOnInit() {
    super.ngOnInit()
  }

  onSave = () => {
    this.loading = true
    this.service.saveReferenceType(this.data).subscribe(res=>{
      this.save()
    },()=> this.loading = false)
  }

  onLabelChange(p){
    p.code = camelize(p.label)
  }

}
