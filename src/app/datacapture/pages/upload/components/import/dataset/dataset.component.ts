import { Component, OnInit } from '@angular/core';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ActionSelectColRange, ActionSelectRowRange } from '../../../store/actions/import.actions';
import { selectColRange, selectRowRange } from '../../../store/selectors/import.selectors';

@Component({
  selector: 'app-dataset',
  templateUrl: './dataset.component.html',
  styleUrls: ['./dataset.component.css']
})
export class DatasetComponent implements OnInit {
  colValue = [0, 0];
  rowValue = [0, 0];
  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
  }

}
