import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { selectEditorSheetResults } from '../../store/selectors/editor.selector';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  worksheet_meta$: any;

  @Input('activeIndex') set index(value){
    this.index$.next(value) 

  }

  index$ = new Subject<Number>()


  constructor(public store: Store<AppState>) { 
    this.worksheet_meta$ = this.index$.pipe(
      switchMap((i) => this.store.select(selectEditorSheetResults(i)))
      ,tap((e)=>console.log({e}))
      )
  }

  ngOnInit(): void {
  }


}
