import { BehaviorSubject } from 'rxjs';
import { AutouploadService } from './../../service/autoupload.service';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {
  listOfColumn = [
    {
      title: 'Name',
      item:"Key"
    },
    {
      title: 'Last Modified',
      item:"LastModified"
    },
    {
      title: 'Size',
      item:"Size"
    },
    {
      title: 'StorageClass',
      item:"StorageClass"
    }
  ];
  
  @Output() reset :EventEmitter<any>=new EventEmitter();
  @Input() profile :any;
  OutputList:BehaviorSubject<any[]>=new BehaviorSubject([]);
  loading=false;
  pagination=false;
  constructor(private auto_S:AutouploadService) { }

  ngOnInit() {
    this.loading=true;
    this.auto_S.getoutputs(this.profile.id)
    .subscribe(
      data=>{
        this.OutputList.next(data.sort((b,a)=>{return this.datecompare(a["LastModified"], b["LastModified"])}));
        this.loading=false;
      }
    )
  }
  Reset(){
    this.reset.emit();
  }
  Sortasc =( (a, b) => {
      return a.LastModified>b.LastModified; 
  });

  stringcompare(a,b){
    return a.localeCompare(b); 
  }
  datecompare(a,b){
    let l1 = new Date(a);
    let l2 = new Date(b);
    return l1.getTime() - l2.getTime();
  }
  numbersort(a,b){
    return a - b;
  }
  sort(e){
   this.OutputList
     .subscribe(data=>{
       if(e.value=="ascend"){
        data.sort((a,b)=>{
          switch (e.key) {
            case "Key":
              return this.stringcompare(a[e.key] , b[e.key]);
            case "StorageClass":
              return this.stringcompare(a[e.key] , b[e.key]);
            case "LastModified":
              return this.datecompare(a[e.key] , b[e.key]);
            default:
              return a[e.key] - b[e.key];
          }
        });
       }else if(e.value=="descend"){
        data.sort((b,a)=>{
          switch (e.key) {
            case "Key":
              return a[e.key].localeCompare(b[e.key]);
            case "StorageClass":
              return a[e.key].localeCompare(b[e.key]);
            case "LastModified":
                let l1 = new Date(a[e.key]);
                let l2 = new Date(b[e.key]);
              return l1.getTime() - l2.getTime();
            default:
              return a[e.key] - b[e.key];
          }
        });
       }
     })
  }

}
