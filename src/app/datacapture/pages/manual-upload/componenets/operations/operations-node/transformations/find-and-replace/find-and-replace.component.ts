import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-find-and-replace',
  templateUrl: './find-and-replace.component.html',
  styleUrls: ['./find-and-replace.component.css']
})
export class FindAndReplaceComponent extends OperationComponent implements OnInit {

  constructor() {
    super()
   }

  ngOnInit() {
  }


}
