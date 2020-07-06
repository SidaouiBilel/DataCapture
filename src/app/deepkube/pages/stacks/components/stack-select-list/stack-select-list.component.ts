import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {
  Stack
} from '../../models/stack.model';

@Component({
  selector: 'app-stack-select-list',
  templateUrl: './stack-select-list.component.html',
  styleUrls: ['./stack-select-list.component.css']
})
export class StackSelectListComponent implements OnInit {

  @Input() title: string;
  @Input() color: string;
  @Input() icon: string;
  @Input() data: Stack[];
  @Input() selectedId: number;
  @Output() selectionChanged = new EventEmitter();

  constructor() {}

  ngOnInit() {

  }

  changeSelection(id: number) {
    this.selectionChanged.emit(id);
  }

}
