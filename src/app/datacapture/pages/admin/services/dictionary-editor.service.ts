import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DictionaryModalComponent } from '../modals/dictionary-modal/dictionary-modal.component';
import { Dictionary } from '../models/dictionary';
import { Observable, Subject} from 'rxjs';
import { DictionaryService } from './dictionary.service';


@Injectable({
  providedIn: 'root'
})
export class DictionaryEditorService {
  loading = false;

  constructor(private modalService: NzModalService, private dictService: DictionaryService) { }

  openDictionaryModal(data) {
    let edit = false;
    let dictionary = new Dictionary()
    if(data) {
      dictionary = data;
      edit = true
    } 
    const modal = this.modalService.create({
      nzTitle: 'Add Dictionary',
      nzFooter:[],
      nzContent: DictionaryModalComponent,
      nzComponentParams: {
        data: dictionary,
        edit: edit
      },
    });

    return new Observable(observer=>{
      modal.afterClose.subscribe(success => {
        if(success){
          observer.next(success)
          observer.complete()
        }
      });
    })
  }

  showDeleteConfirm(data) {
    return new Observable(observer=>{
      this.modalService.confirm({
        nzTitle: 'Are you sure to delete this Dictionary ?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.loading = true
          this.dictService.deleteDictionary(data).subscribe(
            res=> {
              observer.next(res)
              observer.complete()
            })
          },
        nzCancelText: 'No',
        nzOnCancel: () => {}
      })
    })
  }

}
