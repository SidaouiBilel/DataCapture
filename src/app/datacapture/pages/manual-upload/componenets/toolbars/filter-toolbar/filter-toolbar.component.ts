import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { ResetEditor, SetErrorFilter } from '../../../store/actions/editor.actions';
import { selectIsErrorActive } from '../../../store/selectors/editor.selector';

@Component({
  selector: 'app-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.css']
})
export class FilterToolbarComponent implements OnInit {

  constructor(public store: Store<AppState>) { }
  IsErrorActive$
  ngOnInit(): void {
    this.IsErrorActive$ = this.store.select(selectIsErrorActive)
  }

  reset(){
    this.store.dispatch(new ResetEditor())
  }

  filterByError(errorOnly){
    this.store.dispatch(new SetErrorFilter(errorOnly))
  }
}
