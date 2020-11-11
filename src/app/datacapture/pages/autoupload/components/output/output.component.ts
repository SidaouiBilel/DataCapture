import { BehaviorSubject } from 'rxjs';
import { AutouploadService } from './../../service/autoupload.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.css']
})

export class OutputComponent implements OnInit {
  listOfColumn = [
    {
      title: 'Name',
    },
    {
      title: 'Last Modified',
    },
    {
      title: 'Size',
    },
    {
      title: 'StorageClass',
    }
  ];
  
  @Output() reset :EventEmitter<any>=new EventEmitter();
  OutputList:BehaviorSubject<any[]>=new BehaviorSubject([]);
  loading=false;
  constructor(private auto_S:AutouploadService) { }

  ngOnInit() {
    this.loading=true;
    this.auto_S.getoutputs().subscribe(
      data=>{
        this.OutputList.next(data);
        this.loading=false;
      }
    )
  }
  Reset(){
    this.reset.emit();
  }

}
