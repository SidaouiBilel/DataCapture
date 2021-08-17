import { RsuService } from './../../services/rsu.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ReferenceService } from '../../componenets/references/reference.service';

@Component({
  selector: 'app-rsu-composition',
  templateUrl: './rsu-composition.component.html',
  styleUrls: ['./rsu-composition.component.css']
})
export class RsuCompositionComponent implements OnInit {


  loading;
  uploadURI;
  updateURI;

  constructor(public service: RsuService) {
  }

  ngOnInit(): void {
    this.updateURI = this.service.RsuDataImport();
  }

  onBack() {
    console.log("Click on back button");
  }

  laodData() {
  }


  handleChange(info: any): void {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
      this.loading = true;
    }
    if (info.file.status === 'done') {
      this.laodData();
    } else if (info.file.status === 'error') {
      this.laodData();
    }
  }

  download() {
    console.log("download file");
  }

}
