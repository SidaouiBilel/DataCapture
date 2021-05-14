import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-default-value',
  templateUrl: './default-value.component.html',
  styleUrls: ['./default-value.component.css']
})
export class DefaultValueComponent extends OperationComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
