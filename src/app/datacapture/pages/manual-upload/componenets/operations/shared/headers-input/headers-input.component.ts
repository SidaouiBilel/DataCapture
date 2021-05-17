import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { selectActiveSheetHeaders, selectImportedSheetHeadersById } from '@app/datacapture/pages/manual-upload/store/selectors/import.selectors';
import { Store } from '@ngrx/store';
import { AbstractValueAccessor, MakeProvider } from '../abstarct.accessor';

@Component({
  selector: 'app-headers-input',
  templateUrl: './headers-input.component.html',
  styleUrls: ['./headers-input.component.css'],
  providers: [MakeProvider(HeadersInputComponent)]
})
export class HeadersInputComponent extends AbstractValueAccessor implements OnInit {
  @Input() nzSize = 'default';
  @Input() mode = 'default';
  @Input() sheetId;
  // @Input() isDisabled;

  _value = null;
  headers$;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnChanges(): void {
    this.getHeaders()
  }

  ngOnInit(): void {
  }

  getHeaders() {
    if (this.sheetId)
      // columns by selected sheet id
      this.headers$ = this.store.select(selectImportedSheetHeadersById(this.sheetId));
    else
      // columns by active sheet
      this.headers$ = this.store.select(selectActiveSheetHeaders)
  }

}
