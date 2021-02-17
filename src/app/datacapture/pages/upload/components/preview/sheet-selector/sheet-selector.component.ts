import { Component, OnInit, ViewChild, TemplateRef, Input, ElementRef } from '@angular/core';
import { ActionSelectSheet } from '../../../store/actions/preview.actions';
import { selectFileData } from '../../../store/selectors/import.selectors';
import { selectActiveSourceSheet, selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { NzModalService } from 'ng-zorro-antd';
import { SheetSelectionConfirmComponent } from './sheet-selection-confirm/sheet-selection-confirm.component';
import { take, map } from 'rxjs/operators';
import { TranformationService } from '../../transformation/services/tranformation.service';
import { combineLatest, BehaviorSubject, Subject } from 'rxjs';
import { AnyAaaaRecord } from 'dns';
import { selectDatasources } from '../../../store/selectors/multi-import.selectors';
import { SelectActiceDatasourceIndex } from '../../transformation/store/transformation.actions';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent implements OnInit {
  max$ = new BehaviorSubject(2);
  showDropdown$ = new Subject();
  sheets$: any;
  selectedSheet$: any;

  @Input() type = 'grid';

  constructor(
    private host: ElementRef,
    private store: Store<AppState>,
    private modal: NzModalService,
    private pipe: TranformationService) {
    this.selectedSheet$   = this.store.select(selectActiveSourceSheet);
    // tslint:disable-next-line: max-line-length
    this.sheets$    = this.store.select(selectDatasources).pipe(map(sources=>sources.map((s, i)=>({...s, index:i}))))
    combineLatest(this.sheets$, this.max$).subscribe(
      ([sheets, max]: any) => {
        this.showDropdown$.next(sheets.length > max);
      }
    );
  }
  ngOnInit(): void {}

  onSheetSelected(index: any): void {
    this.selectSheet(index);
  }

  selectSheet(index) {
    this.store.dispatch(new SelectActiceDatasourceIndex(index));
  }

  onResize(event) {
    const width = event.newWidth;
    let max = 0;
    if (width > 400 ) { max = 3; } else if (width > 300 ) { max = 2; } else if (width > 200 ) { max = 1; }
    this.max$.next(max);
  }
}
