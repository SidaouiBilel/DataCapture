import { CategoryModalComponent } from './../modals/category-modal/category-modal.component';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, Observer } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { SuperDomainService } from './super-domain.service';
import { Category } from '../models/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.admin


  constructor(private modal: NzModalService, private sds: SuperDomainService, private http: HttpClient) { }

  loading = false;

  openCategoryModal(data, i, key) {
    let category = new Category(data.dict_id);
    let keyword = false
    let index = null

    if (data) {
      category = { ...data };
    }

    if (key && i != null) {
      keyword = true;
      index = i;
    }

    const modal = this.modal.create({
      nzTitle: 'Edit Category',
      nzFooter: [],
      nzContent: CategoryModalComponent,
      nzComponentParams: {
        data: category,
        key: keyword,
        index: index
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

  openConfig(dict_id) {
    let category = new Category(dict_id)
    const modal = this.modal.create({
      nzTitle: 'Add Category',
      nzFooter: [],
      nzContent: CategoryModalComponent,
      nzComponentParams: {
        data: category,
      },
    });
    const instance = modal.getContentComponent();
    return Observable.create((done: Observer<any>) => {
      modal.afterClose.subscribe(result => {
        if (result) {
          done.next(result)
          done.complete()
        }
      });
    })
  }

  getAllWords(dict_id) {
    return this.http.get(this.url + "category/" + dict_id)
  }

  // Update all domains
  updateHierarchy() {
    throw new Error('Method not implemented.');
  }

  saveCategorie(cat): Observable<any> {
    return this.http.post(this.url + "category/", cat)
  }

  showDeleteConfirm(data) {
    return new Observable(observer => {
      this.modal.confirm({
        nzTitle: 'Are you sure to delete this Dictionary ?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.loading = true
          this.deleteCategory(data).subscribe(
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

  deleteCategory(cat: any): Observable<any> {
    return this.http.delete(this.url + "category/" + cat['id']);
  }

  deleteKeyword(data) {
    return new Observable(observer => {
      this.modal.confirm({
        nzTitle: 'Are you sure to delete this keyword ?',
        nzContent: 'This action cannot be reverted.',
        nzOkText: 'Yes',
        nzOkType: 'danger',
        nzOnOk: () => {
          this.loading = true
          this.saveCategorie(data).subscribe(
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
