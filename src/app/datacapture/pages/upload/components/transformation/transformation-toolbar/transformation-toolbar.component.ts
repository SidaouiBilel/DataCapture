import { Component, OnInit, Input } from '@angular/core';
import { TransformationPipeComponent } from '../transformation-pipe/transformation-pipe.component';
import { Store } from '@ngrx/store';
import { TranformationService } from '../services/tranformation.service';
import { AppState } from '@app/core'; 
import { map } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-transformation-toolbar',
  templateUrl: './transformation-toolbar.component.html',
  styleUrls: ['./transformation-toolbar.component.css']
})
export class TransformationToolbarComponent extends TransformationPipeComponent implements OnInit {

  @Input() showTransformation = false;
  @Input() showActions = false;

  shownTrans$     = new BehaviorSubject([])
  collapsedTrans$ = new BehaviorSubject([])
  
  saveBtnType$
  ghostBtn$
  constructor(private toolbarstore: Store<AppState>, private toolbarpipes: TranformationService) {
    super(toolbarstore, toolbarpipes);

    this.saveBtnType$     = this.toolbarpipes.modified$.pipe(map((m)=> m?"primary":"default"))
    this.ghostBtn$        = this.toolbarpipes.modified$.pipe(map((m)=> m?"":"ghost"))

    console.table(this.tarnsformations.filter(n=>!n.collapse))
    this.shownTrans$.next(this.tarnsformations.filter(n=>!n.collapse))
    this.collapsedTrans$.next(this.tarnsformations.filter(n=>n.collapse))
  }

  ngOnInit() {

  }

}
