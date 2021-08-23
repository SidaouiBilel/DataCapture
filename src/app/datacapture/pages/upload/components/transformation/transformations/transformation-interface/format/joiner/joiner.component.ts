import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { selectDatasources } from '@app/datacapture/pages/upload/store/selectors/multi-import.selectors';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectActiveTransformationIndex, selectSourceTranformations, selectTranformation } from '../../../../store/transformation.selectors';
import { TransformationInterfaceComponent } from '../../transformation-interface.component';

@Component({
  selector: 'app-joiner',
  templateUrl: './joiner.component.html'
})
export class JoinerComponent extends TransformationInterfaceComponent implements OnInit  {

  datasources$

  constructor(private store:Store<AppState>) { 
    super()

    this.datasources$ = combineLatest(this.store.select(selectDatasources), this.store.select(selectSourceTranformations), this.store.select(selectActiveTransformationIndex))
      .pipe(map(([originalSources, transformedSources, activeSourceIndex])=>{
        return originalSources.map((s, i)=>{
          const sheet:any = {file_id:s.file_id} 
          const t = transformedSources[i]
          
          if(t.transformedFilePath){
            sheet.sheet_id = t.transformedFilePath
            sheet.label = s.label + '(Transformed)'
          } else {
            sheet.sheet_id = s.sheet_id
            sheet.label = s.label
          }

          return sheet
        }).filter((s,i)=>i!=activeSourceIndex)
      }))
  }

  dataSources = []

  ngOnInit() {
  }

  onDataSourceSelected(sheet){

    this.data.join_sheet_id = sheet.sheet_id
    this.data.join_file_id = sheet.file_id

    this.onDataChanged()
  }

  compareWith(o1, o2){
    if (!o1 && !o2) return true
    if (!o1 || !o2) return false
    if (o1.sheet_id == o2.sheet_id)
      return true
    else
      return false
  }
}
