import { Component, OnInit, Input } from '@angular/core';
import { TransformationPipeComponent } from '../transformation-pipe/transformation-pipe.component';
import { Store } from '@ngrx/store';
import { TranformationService } from '../services/tranformation.service';
import { AppState } from '@app/core'; 
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-transformation-toolbar',
  templateUrl: './transformation-toolbar.component.html',
  styleUrls: ['./transformation-toolbar.component.css']
})
export class TransformationToolbarComponent extends TransformationPipeComponent implements OnInit {

  @Input() showTransformation = false;
  @Input() showActions = false;
  
  saveBtnType$
  ghostBtn$
  constructor(private toolbarstore: Store<AppState>, private toolbarpipes: TranformationService) {
    super(toolbarstore, toolbarpipes);

    this.saveBtnType$ = this.toolbarpipes.modified$.pipe(map((m)=> m?"primary":"default"))
    this.ghostBtn$    = this.toolbarpipes.modified$.pipe(map((m)=> m?"":"ghost"))
  }

  ngOnInit() {

  }

}
