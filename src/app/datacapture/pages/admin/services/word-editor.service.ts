import { Injectable } from '@angular/core';
import { Word } from '../models/word';
import { WordModalComponent } from '../modals/word-modal/word-modal.component';
import { NzModalService } from 'ng-zorro-antd';
import { Observable } from 'rxjs';
import { WordService } from './word.service';


@Injectable({
  providedIn: 'root'
})
export class WordEditorService {
  loading = false;

  constructor(private modal: NzModalService, private wordService: WordService) { }
    // To add or edit a word
    openWordModal(data, dict_id) {
      let word = new Word(dict_id);

      const edit = data? true : false;
      if (data) {
        word = { ...data };
      }

      const modal = this.modal.create({
        nzTitle: 'Word',
        nzFooter: [],
        nzContent: WordModalComponent,
        nzComponentParams: {
          data: word,
          edit
        },
      });

      return new Observable(observer => {
        modal.afterClose.subscribe(success => {
          if (success) {
            observer.next(success)
            observer.complete()
          }
        });
      })
    }

    showDeleteConfirm(data) {
      return new Observable(observer => {
        this.modal.confirm({
          nzTitle: 'Are you sure to delete this Word ?',
          nzContent: 'This action cannot be reverted.',
          nzOkText: 'Yes',
          nzOkType: 'danger',
          nzOnOk: () => {
            this.loading = true
            this.wordService.deleteWord(data).subscribe(
              res => {
                observer.next(res)
                observer.complete()
              })
          },
          nzCancelText: 'No',
          nzOnCancel: () => { }
        })
      })
    }

}
