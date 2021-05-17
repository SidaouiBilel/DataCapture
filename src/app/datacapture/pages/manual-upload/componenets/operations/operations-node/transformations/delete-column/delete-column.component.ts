import { OperationComponent } from './../../operation.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-column',
  templateUrl: './delete-column.component.html',
  styleUrls: ['./delete-column.component.css']
})
export class DeleteColumnComponent extends OperationComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit(): void {
  }

}
