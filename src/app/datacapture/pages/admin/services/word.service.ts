import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { Word } from '../models/word';
import { WordModalComponent } from '../modals/word-modal/word-modal.component';


@Injectable({
  providedIn: 'root'
})
export class WordService {

  url = environment.admin

  constructor(private modal: NzModalService, private http: HttpClient) { }

  loading = false;

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
          this.deleteWord(data).subscribe(
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

  getAllWords(dict_id) {
    return this.http.get(this.url + "word/" + dict_id)
  }

  saveWord(cat): Observable<any> {
    return this.http.post(this.url + "word/", cat)
  }

  deleteWord(cat: any): Observable<any> {
    return this.http.delete(this.url + "word/" + cat['id']);
  }

}
