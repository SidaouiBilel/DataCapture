import { Component, OnInit } from '@angular/core';
import { OperationComponent } from '../../operation.component';

@Component({
  selector: 'app-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.css']
})
export class HashComponent extends OperationComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit(): void {
  }

}
