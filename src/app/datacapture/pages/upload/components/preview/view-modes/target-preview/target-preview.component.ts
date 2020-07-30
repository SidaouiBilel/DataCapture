import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectActivePipe } from '../../../transformation/store/transformation.selectors';
import { selectFileData, selectSelectedFile } from '@app/datacapture/pages/upload/store/selectors/import.selectors';
import { AppState } from '@app/core';
import { merge, combineLatest, BehaviorSubject } from 'rxjs';
import { selectSelectedSheet } from '@app/datacapture/pages/upload/store/selectors/preview.selectors';
import { PreMappingTransformationService } from '@app/datacapture/pages/upload/services/pre-mapping-transformation.service';

@Component({
  selector: 'app-target-preview',
  templateUrl: './target-preview.component.html',
  styleUrls: ['./target-preview.component.css']
})
export class TargetPreviewComponent implements OnInit, OnDestroy {

  // DECLARATIONS
  filename$
  activePipe$
  selectedSheet$

  // SUBSCRIPTIONS
  combiner$ 

  // TABLE DATA
  loading$ = new BehaviorSubject<boolean>(false)
  data$ = new BehaviorSubject<any>([
    {'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'},{'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}, {'A':'q','B':'c'}
  ])
  headers$ = new BehaviorSubject<any>(['A', 'B', 'C', 'D', 'K'])

  constructor(
    private store:Store<AppState>,
    private service:PreMappingTransformationService
    ) {
    this.selectedSheet$ = this.store.select(selectSelectedSheet)
    this.filename$ = this.store.select(selectFileData)
    this.activePipe$ = this.store.select(selectActivePipe)
  }
  ngOnDestroy(): void {
    this.combiner$.unsubscribe()
  }

  ngOnInit() {
    this.combiner$ = combineLatest(this.filename$, this.activePipe$, this.selectedSheet$).subscribe(
      ([fileData, selectedPipe, selectedSheet])=>{
        // console.log([fileData, selectedPipe, selectedSheet])
      }
    )
  }

}
