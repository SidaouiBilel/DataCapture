import { BehaviorSubject } from 'rxjs';
import { S3connectorsService } from './../../services/s3connectors.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-s3',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  @Input() reload :BehaviorSubject<boolean>;
  @Input() searchTerm;
  S3C$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  loading = false;
  constructor(private S3_S:S3connectorsService) { }

  ngOnInit() {
    this.getS3connectors();

    this.reload.subscribe(res=>{
      if(res){
        this.getS3connectors();
      }
    })
  }

  getS3connectors(){
    this.loading=true;
    this.S3_S.GET_ALL_S3_connector().subscribe(
      data=>{
          this.S3C$.next(data);
          setTimeout(()=>{this.loading=false;},500);
      }
    );
  }

}
