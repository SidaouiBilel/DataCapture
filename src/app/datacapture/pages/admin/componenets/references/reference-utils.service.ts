import { Injectable } from '@angular/core';
import { deepCopy } from '@app/shared/utils/objects.utils';
import { NzModalService } from 'ng-zorro-antd';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ShareWithCollectionsComponent } from '../../modals/share-with-collections/share-with-collections.component';
import { ReferenceDataEditorComponent } from './reference-data-editor/reference-data-editor.component';
import { RefernceType } from './reference-type.model';
import { RefernceData } from './reference.model';
import { ReferenceService } from './reference.service';
import { RefrenceTypeEditorComponent } from './refrence-type-editor/refrence-type-editor.component';

@Injectable()
export class ReferenceUtilsService {
  setActiveRefType(item: any) {
    this.activeRefType$.next(item)
  }

  constructor(private modal: NzModalService, private service: ReferenceService) { }

  activeRefType$ = new Subject()

  onAddRefType(collection_id){
    return this.openRefTypeEditor(new RefernceType(collection_id))
  }

  onEditRefType(refType){
    return this.openRefTypeEditor(refType)
  }

  openRefTypeEditor(refType:RefernceType){
    return new Observable(observer=>{
      this.modal.create({ nzContent: RefrenceTypeEditorComponent,
        nzComponentParams: {data: deepCopy(refType)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  openShareRefType(refType:RefernceType){
    return new Observable(observer=>{
      this.modal.create({ nzContent:   ShareWithCollectionsComponent,
        nzComponentParams: {data: deepCopy(refType)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  onAddRefData(refType:RefernceType){
    return this.openRefDataEditor(new RefernceData(refType))
  }

  onEditRefData(refData){
    return this.openRefDataEditor(refData)
  }

  openRefDataEditor(refData:RefernceData){
    return new Observable(observer=>{
      this.modal.create({ nzContent: ReferenceDataEditorComponent,
        nzComponentParams: {data: deepCopy(refData)},
      }).afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  onDeleteRefData(data){
    return this.service.deleteReferenceData(data)
  }

  onDeleteRefType(data){
    return this.service.deleteReferenceType(data)
  }
}
