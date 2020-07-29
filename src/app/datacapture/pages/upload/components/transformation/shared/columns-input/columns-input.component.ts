import { Component, OnInit } from '@angular/core';
import { selectMappedSources } from '@app/datacapture/pages/upload/store/selectors/mapping.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '@app/core';
import { reduce, map } from 'rxjs/operators';
import { AbstractValueAccessor, MakeProvider } from '../abstarct.accessor';

@Component({
  selector: 'app-columns-input',
  templateUrl: './columns-input.component.html',
  styleUrls: ['./columns-input.component.css'],
  providers: [MakeProvider(ColumnsInputComponent)]
})
export class ColumnsInputComponent extends AbstractValueAccessor implements OnInit {

  columns$
  
  constructor(private store: Store<AppState>) { 
    super()
    this.columns$ = this.store.select(selectMappedSources).pipe(map((dict)=> Object.keys(dict) ));
  }

  ngOnInit() {
  }

}
