import { selectProfile } from './../../../../../core/auth/auth.selectors';
import { Observable, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState, selectRouterState , NotificationService} from '@app/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent implements OnInit {

  router$: Observable<any>;
  pageList: string[];
  defaultupload={
    filename:"",
    outputs:[]
  }
  autouploaddata:any=this.defaultupload;
  autouploaddata$:BehaviorSubject<any>   = new BehaviorSubject(this.defaultupload);
  Profile:any;
  constructor(private store:Store<AppState>,private notification: NotificationService) { 
    this.router$ = this.store.select(selectRouterState);
    this.router$.subscribe((res) => {
      try {
        this.pageList = ['home'];
        this.pageList = this.pageList.concat(res.state.url.substring(1).split('/').slice(1).filter((e) => {if ( e !== '' ) { return e; }}));
      } catch (error) {
        this.notification.error(error.message);
      }
    });
    this.store.select(selectProfile).subscribe(res=>{
      this.Profile=res;
    });

  }

  ngOnInit() {
  }

  index=0;
  setindex(number){
   this.index=number;
  }


  addfilename(filename){
    console.log(filename);
    this.autouploaddata={
      ...this.autouploaddata,
      filename:filename,
    };
    this.autouploaddata$.next(this.autouploaddata);
  }

  
  addoutputs(outputs){
    this.autouploaddata={
      ...this.autouploaddata,
      outputs:outputs
    };
    this.autouploaddata$.next(this.autouploaddata);
  }
  next(){
    this.index++;
  }
  previous(){
    this.index--;
  }
  reset(){
    this.autouploaddata$.next(this.defaultupload);
    this.autouploaddata=this.defaultupload;
    this.index=0;
  }



}
