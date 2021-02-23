import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-upload-data-result',
  templateUrl: './upload-data-result.component.html',
  styleUrls: ['./upload-data-result.component.css']
})
export class UploadDataResultComponent implements OnInit {
  @Input() uploadStatus$: any;
  @Input() result$: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() { }

  ngOnInit(): void {
  }

}
