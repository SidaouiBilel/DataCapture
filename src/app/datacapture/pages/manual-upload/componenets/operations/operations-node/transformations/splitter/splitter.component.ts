import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-splitter',
  templateUrl: './splitter.component.html',
  styleUrls: ['./splitter.component.css']
})
export class SplitterComponent extends OperationComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
