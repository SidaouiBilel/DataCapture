import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { AbstractValueAccessor, MakeProvider } from '../abstarct.accessor';
import { selectFileHeaders } from '@app/datacapture/pages/upload/store/selectors/import.selectors';

@Component({
  selector: 'app-columns-input',
  templateUrl: './columns-input.component.html',
  styleUrls: ['./columns-input.component.css'],
  providers: [MakeProvider(ColumnsInputComponent)]
})
export class ColumnsInputComponent extends AbstractValueAccessor implements OnInit {
  _value = null;
  @Input() mode = 'default';
  columns$;
  
  constructor(private store: Store<AppState>) { 
    super()
    this.columns$ = this.store.select(selectFileHeaders)
  }

  ngOnInit() {
  }

}
