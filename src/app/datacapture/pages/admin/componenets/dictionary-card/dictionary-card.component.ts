import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DictionaryEditorService } from '../../services/dictionary-editor.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-dictionary-card',
  templateUrl: './dictionary-card.component.html',
  styleUrls: ['./dictionary-card.component.css']
})
export class DictionaryCardComponent implements OnInit {
  @Input() data;
  @Input() loading;
  @Input() class;
  small;

  @Output() edited = new EventEmitter<boolean>();
  @Output() deleted = new EventEmitter<boolean>();

  constructor(private dictEditorService: DictionaryEditorService, public s: StoreService,private router: Router) {
    s.displaySize$.subscribe((size) => this.small = (size === 'small'));
  }

  categories() {

  }

  ngOnInit(): void {
  }

  onEdit() {
    this.dictEditorService.openDictionaryModal(this.data).subscribe(() => {
      this.edited.emit(true);
    });
  }

  onDelete() {
    this.dictEditorService.showDeleteConfirm(this.data).subscribe(() => {
      this.deleted.emit(true);
    });
  }


  navigate(r) {
    this.router.navigate(r);
  }

}
