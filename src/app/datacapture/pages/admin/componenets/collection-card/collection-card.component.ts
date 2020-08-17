import { Component, OnInit, Input } from '@angular/core';
import { CollectionEditor } from '../../services/collection-editor.service';

@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.css']
})
export class CollectionCardComponent implements OnInit {

  @Input() data;
  @Input() loading;

  constructor(private editor: CollectionEditor) { }

  ngOnInit() {
  }

  onEdit() {

  }

  onCopy() {

  }

  onDelete() {

  }
}
