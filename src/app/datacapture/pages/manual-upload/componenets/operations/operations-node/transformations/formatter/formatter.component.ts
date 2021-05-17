import { Component, Input, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-formatter',
  templateUrl: './formatter.component.html',
  styleUrls: ['./formatter.component.css']
})
export class FormatterComponent extends OperationComponent implements OnInit {

  @Input() showFrom = true

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
