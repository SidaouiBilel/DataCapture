import { Component, OnInit } from '@angular/core';
import { EntityModal } from '../entity-modal';
import { NzModalRef } from 'ng-zorro-antd';
import { DictionaryService } from '../../services/dictionary.service';


@Component({
  selector: 'app-dictionary-modal',
  templateUrl: './dictionary-modal.component.html',
})
export class DictionaryModalComponent extends EntityModal implements OnInit {

  constructor(private mr: NzModalRef, private dictService: DictionaryService) {
    super(mr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  canSave() {
    return this.data.name && this.data.description;
  }

  canClose() {
    return !this.loading;
  }

  close() {
    this.modalrRef.close(false);
  }

  save() {
    if (this.canSave()) {
      this.loading = false;
      this.dictService.saveDictionary(this.data).subscribe(res => {
        this.modalrRef.close(true);
      });
    }
  }

}
