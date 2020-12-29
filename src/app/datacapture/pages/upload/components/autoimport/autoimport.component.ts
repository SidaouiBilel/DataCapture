import { selectDomain } from './../../store/selectors/import.selectors';
import { AppState, selectProfile } from '@app/core';
import { Store } from '@ngrx/store';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Component, OnInit , Input, Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-autoimport',
  templateUrl: './autoimport.component.html',
  styleUrls: ['./autoimport.component.css']
})
export class AutoimportComponent implements OnInit {

  constructor(private FI_S:FileImportService , private store:Store<AppState>) { }

  UserFiles$:BehaviorSubject<any[]>=new BehaviorSubject([]);
  Profile$:Observable<any>;
  Profile:any;
  selectedDomain$:Observable<any>;
  selectedDomain:any;
  loading = true;
  searchFile="";
  @Input() selecteddomain;
  @Input() autoimportloading;
  @Output() _autoimportloading :EventEmitter<any> = new EventEmitter();
  @Output() auto_import :EventEmitter<any> = new EventEmitter();
  ngOnInit() {
    this.Profile$=this.store.select(selectProfile);
    this.Profile$.subscribe(res=>{
      this.Profile=res;
      this.load_extracted_files(res.id);
    });

    this.selectedDomain$ = this.store.select(selectDomain);
    this.selectedDomain$.subscribe(res=>{
      this.selectedDomain=res;
    });
  }

  reload(){
    this.load_extracted_files(this.Profile.id);
  }

  load_extracted_files(uid){
    this.loading=true;
    this.FI_S.get_extracted_files(uid).subscribe(
      data=>{
        this.UserFiles$.next([...data]);
        this.loading=false;
      }
    )
  }
  
  auto_import_file(filename){
     this._autoimportloading.emit();
     this.FI_S.select_file(this.selectedDomain.id,this.Profile.id , filename).subscribe(
      data=>{
        this.auto_import.emit(data);
       },er=>{
        this._autoimportloading.emit();
       }
     )
  }



}
