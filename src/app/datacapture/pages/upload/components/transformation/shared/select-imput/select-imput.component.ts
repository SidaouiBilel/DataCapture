import { AbstractValueAccessor, MakeProvider } from '@app/datacapture/pages/upload/components/transformation/shared/abstarct.accessor';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-imput',
  templateUrl: './select-imput.component.html',
  styleUrls: ['./select-imput.component.css'],
  providers: [MakeProvider(SelectImputComponent)]
})
export class SelectImputComponent extends AbstractValueAccessor implements OnInit {

  @Input() data;
  _value = null;
  constructor() {
    super();
   }

  ngOnInit() {
  }

}
