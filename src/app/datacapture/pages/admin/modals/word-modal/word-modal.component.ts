import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { WordService } from '../../services/word.service';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-word-modal',
  templateUrl: './word-modal.component.html'
})
export class WordModalComponent extends EntityModal implements OnInit {

  data
  edit

  constructor(private mr: NzModalRef, private ds: DomainService, private WordService: WordService) {
    super(mr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  close() {
    this.modalrRef.close(false);
    this.save()
  }

  onSave() {
    if (this.canSave()) {
      this.loading = true;
      this.WordService.saveWord(this.data).subscribe(res => {
        this.save()
        this.loading = false;
      }, (err) => {
        this.loading = false
      });
    }
  }



}
