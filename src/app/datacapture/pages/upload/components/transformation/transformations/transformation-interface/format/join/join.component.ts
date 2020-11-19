import { selectuserDatasets } from './../../../../store/transformation.selectors';
import { Loaduserdatasets } from './../../../../store/transformation.actions';
import { Observable, BehaviorSubject } from 'rxjs';
import { AppState  , selectProfile} from '@app/core';
import { Store } from '@ngrx/store';
import { TransformationInterfaceComponent } from './../../transformation-interface.component';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent extends TransformationInterfaceComponent implements OnInit {

  Profile:any;
  Userfiles$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  constructor(private store:Store<AppState>) { 
    super();
  }

  join_types = ["left", "right", "outer", "inner"];
  selectedfile;
  ngOnInit() {
    console.log(this.data);
    this.store.select(selectuserDatasets).subscribe(
      res=>{
        if(res.loaded){
          this.Userfiles$.next(res.data);
        }else{
          this.store.select(selectProfile).subscribe(
            res=>{
              this.Profile = res.id;
              this.store.dispatch(new Loaduserdatasets(res.id));
            }
          )
        }
      }
    )
  }
  Fileschange(e){
    this.Userfiles$.subscribe(
      data=>{
        let index = data.map(a=>(a.fileId)).indexOf(e);
        if(index>=0){
         this.data.worksheet_id=data[index].worksheetId;
        }
        this.onDataChanged();
      }
    )
  }

}
