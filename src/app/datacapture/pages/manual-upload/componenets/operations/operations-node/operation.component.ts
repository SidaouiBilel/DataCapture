import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-trasnformation-intefrace',
  template: '<div>Not Implemented</div>',
})
export class OperationComponent implements OnInit {

  @Input() data: any = {};
  @Input() index = null;
  @Input() size = 'small';
  @Output() dataChanged = new EventEmitter<any>();
  form_orientation = 'horizontal';

  constructor() { }

  ngOnInit(): void {
  }

  validate() {
    return true;
  }

  onDataChanged() {
    // VALIDATE
    this.dataChanged.emit(this.data);
  }

}
