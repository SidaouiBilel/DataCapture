import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { WordService } from '../../services/word.service';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html'
})
export class CategoryModalComponent extends EntityModal implements OnInit {

  data
  key = false
  index

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
      this.WordService.saveCategorie(this.data).subscribe(res => {
        this.save()
        this.loading = false;
      }, (err) => {
        this.loading = false
      });
    }
  }



}
