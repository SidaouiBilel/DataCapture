import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-delete-rows',
  templateUrl: './delete-rows.component.html',
  styleUrls: ['./delete-rows.component.css']
})
export class DeleteRowsComponent extends OperationComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit(): void { }

}
