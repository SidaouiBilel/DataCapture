import { BehaviorSubject } from 'rxjs';
import { DBconnectorsService } from './../../services/dbconnectors.service';
import { DBconnector } from '../../models/DBconnector.model'
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-listdbconnectors',
  templateUrl: './listdbconnectors.component.html',
  styleUrls: ['./listdbconnectors.component.css']
})
export class ListdbconnectorsComponent implements OnInit {

  loading :Boolean = false;
  @Output() updateDBC : EventEmitter <any> = new EventEmitter();
  @Input() searchTerm:String;
  @Input() reload :BehaviorSubject<any>;
  DBC$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  constructor(private DBC_S:DBconnectorsService) { }

  ngOnInit() {
    this.loaddata();
    this.reload.subscribe(res=>{
      if(res){
        this.loaddata();
      }});
  }

  loaddata(){
    this.loading=true;
    this.DBC_S.GET_ALL_DB_connector().subscribe(
      data=>{
        this.DBC$.next([...data]);
        setTimeout(()=>{this.loading=false;},500);
      }
    );
  }

}
