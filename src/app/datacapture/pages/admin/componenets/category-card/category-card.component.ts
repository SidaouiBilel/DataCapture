import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() data;
  @Input() loading;
  @Input() class;
  small;
  table = false;

  @Output() edited = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<boolean>();
  @Output() copied = new EventEmitter<boolean>();

  constructor(public s: StoreService,private router: Router,private catService:CategoryService) {
    s.displaySize$.subscribe((size) => this.small = (size === 'small'));
  }

  goKeyword() {
    this.table = !this.table
  }

  ngOnInit(): void {
    console.log(this.data)
  }


  onEdit() {
    this.catService.openCategoryModal(this.data, null, false).subscribe(() => {
      this.edited.emit(true);
    });

  }

  onEditKeyword(index) {
    this.catService.openCategoryModal(this.data, index, true).subscribe(() => {
      this.edited.emit(true);
    });
  }

  onDeleteKeyword(index) {
    this.data["keywords"].splice(index,1);
    this.catService.deleteKeyword(this.data).subscribe(() => {
      this.deleted.emit(true);
    });
  }

  onDelete() {
    this.catService.showDeleteConfirm(this.data).subscribe(() => {
      this.deleted.emit(true);
    });
  }

  navigate(r) {
    this.router.navigate(r);
  }

}
