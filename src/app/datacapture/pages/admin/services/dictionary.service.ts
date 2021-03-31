import { Injectable } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd';
import { DictionaryModalComponent } from '../modals/dictionary-modal/dictionary-modal.component';
import { Dictionary } from '../models/dictionary';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  url = environment.admin

  constructor(private modalService: NzModalService, private http: HttpClient) { }

  openDictionaryModal() {
    let dictionary = new Dictionary()

    const modal = this.modalService.create({
      nzTitle: 'Add Dictionary',
      nzFooter:[],
      nzContent: DictionaryModalComponent,
      nzComponentParams: {
        data: dictionary,
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

  saveDictionary(dict){
    return this.http.post( this.url + "dictionary/", dict)
  }

  getAllDictionaries(){
    return this.http.get( this.url + "dictionary/")
  }
}
