import { ExtractorService } from './../../services/extractor.service';
import { AppState , selectProfile , NotificationService} from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fom-db',
  templateUrl: './fom-db.component.html',
  styleUrls: ['./fom-db.component.css']
})
export class FomDbComponent implements OnInit {


  validateDataBaseForm :FormGroup;
  DBCloading=true;
  Submiting=false;
  DBC$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  Profile$:Observable<any>;
  Profile:any;

  constructor(private fb:FormBuilder ,
              private Notif_S:NotificationService, 
              private Extract_S:ExtractorService,
              private store:Store<AppState>) {

            this.Profile$=this.store.select(selectProfile);
            this.Profile$.subscribe(res=>{this.Profile=res;});
  }


  ngOnInit() {
    this.validateDataBaseForm=this.fb.group({
      "source_schema":[null , [Validators.required]],
      "source_table":[null , [Validators.required]],
      "destination_schema": [null , [Validators.required]],
      "destination_table":  [null , [Validators.required]],
      "connector_id":[null , [Validators.required]],
      "query": [null , []]
    });
    this.load_DBCS();
  }

  submitForm(): void {
    for (const i in this.validateDataBaseForm.controls) {
      this.validateDataBaseForm.controls[i].markAsDirty();
      this.validateDataBaseForm.controls[i].updateValueAndValidity();
    }
    // this.LAUNCH_EXTRACTION();
  }

  load_DBCS(){
    this.DBCloading=true;
    this.Extract_S.GET_ALL_DB_connector().subscribe(
      data=>{
        this.DBC$.next(data);
        this.DBCloading=false;
      }
    )
  }


}
