import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { AbstractValueAccessor, MakeProvider } from '../abstarct.accessor';
import { selectInputCloumnsByIndex } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';

@Component({
  selector: 'app-columns-input',
  templateUrl: './columns-input.component.html',
  styleUrls: ['./columns-input.component.css'],
  providers: [MakeProvider(ColumnsInputComponent)]
})
export class ColumnsInputComponent extends AbstractValueAccessor implements OnInit {
  @Input() nzSize = 'default';
  @Input() mode = 'default';
  @Input('nodeIndex') set nodeIndex(index) {
    this.columns$ = this.store.select(selectInputCloumnsByIndex(index));
  }
  _value = null;
  columns$;
  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
  }

}
