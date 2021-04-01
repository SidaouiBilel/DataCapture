import { Component, OnInit } from '@angular/core';
import { camelize } from '@app/shared/utils/strings.utils';
import { DATA_TYPES } from '@app/shared/utils/types';
import { NzModalRef } from 'ng-zorro-antd';
import { CategoryService } from '../../services/category.service';
import { DomainService } from '../../services/domain.service';
import { EntityModal } from '../entity-modal';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent extends EntityModal implements OnInit {

  data
  constructor(private mr: NzModalRef, private ds: DomainService, private catService: CategoryService) {
    super(mr);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  close() {
    this.modalrRef.close(false);
  }

  //Save a category
  onSave() {
    if (this.canSave()) {
      this.loading = true;
      this.catService.saveCategorie(this.data).subscribe(res => {
        this.save()
        this.loading = false;
      }, (err) => {
        this.loading = false
      });
    }
  }



}
