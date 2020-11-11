import { S3connectorsService } from './../../../Connectors/services/s3connectors.service';
import { ExtractorService } from './../../services/extractor.service';
import { AppState , selectProfile , NotificationService} from '@app/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder , FormGroup , Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datalake-modal',
  templateUrl: './datalake-modal.component.html',
  styleUrls: ['./datalake-modal.component.css']
})
export class DatalakeModalComponent implements OnInit {

  validateDataLakeForm :FormGroup;
  DLCloading=true;
  Submiting=false;
  DLC$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  Profile$:Observable<any>;
  Profile:any;
  constructor(private fb:FormBuilder ,
              private Notif_S:NotificationService, 
              private Extract_S:ExtractorService,
              private Connector_S:S3connectorsService,
              private store:Store<AppState>) { 

                this.Profile$=this.store.select(selectProfile);
                this.Profile$.subscribe(res=>{this.Profile=res;});
    }

  ngOnInit() {
    this.validateDataLakeForm=this.fb.group({
      "filename":[null , [Validators.required]],
      "bucket":[null , [Validators.required]],
      "connector_id": [null , [Validators.required]],
    });
    this.load_connectors();
  }

  load_connectors(){
    this.DLCloading=true;
    this.Connector_S.GET_ALL_S3_connector().subscribe(
      data=>{
        this.DLCloading=false;
        this.DLC$.next(data);
      }
    )
  }
  submitForm(): void {
    for (const i in this.validateDataLakeForm.controls) {
      this.validateDataLakeForm.controls[i].markAsDirty();
      this.validateDataLakeForm.controls[i].updateValueAndValidity();
    }
    // this.LAUNCH_EXTRACTION();
  }
}
