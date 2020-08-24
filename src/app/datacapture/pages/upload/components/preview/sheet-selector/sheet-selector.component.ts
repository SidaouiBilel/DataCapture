import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActionSelectSheet } from '../../../store/actions/preview.actions';
import { selectFileData } from '../../../store/selectors/import.selectors';
import { selectSelectedSheet } from '../../../store/selectors/preview.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { NzModalService } from 'ng-zorro-antd';
import { SheetSelectionConfirmComponent } from './sheet-selection-confirm/sheet-selection-confirm.component';
import { take } from 'rxjs/operators';
import { TranformationService } from '../../transformation/services/tranformation.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-sheet-selector',
  templateUrl: './sheet-selector.component.html',
  styleUrls: ['./sheet-selector.component.css']
})
export class SheetSelectorComponent{
  fileMetaData$: any;
  selectedSheet$: any;
  
  constructor(private store: Store<AppState>, private modal: NzModalService, private pipe: TranformationService) {
    this.fileMetaData$ = this.store.select(selectFileData);
    this.selectedSheet$ = this.store.select(selectSelectedSheet);
  }

  onSheetSelected(index: any): void {
    combineLatest(this.pipe.active$, this.selectedSheet$).pipe(take(1)).subscribe(
      ([activePipe, selectedSheet])=>{
        // IF SAME SHEET RETURN
        if(selectedSheet == index) return
        // CHECK IF PIPE IS ACTIVE
        if(activePipe){
          this.openConfirmationModal(index)
        } else {
          this.selectSheet(index)
        }
    })
  }
  
  openConfirmationModal(index: any) {
    const modal = this.modal.create({
      nzContent: SheetSelectionConfirmComponent,
      nzOnOk:()=> this.selectSheet(index)
    })
    modal.afterClose.pipe(take(1)).subscribe((result)=>{
      if(result){
        if(result.keepPipe)
          this.selectSheet(index)
        else {
          this.pipe.setActive(null)
          this.selectSheet(index)
        }
      }
    })
  }

  selectSheet(index){
    this.store.dispatch(new ActionSelectSheet(index))
  }

  canDeactivate = (i, p) => false;
}
