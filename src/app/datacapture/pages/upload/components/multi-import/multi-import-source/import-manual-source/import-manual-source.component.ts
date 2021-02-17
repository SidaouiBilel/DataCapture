import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '@app/core';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { environment } from '@env/environment';
import * as _ from 'lodash'

@Component({
  selector: 'app-import-manual-source',
  templateUrl: './import-manual-source.component.html',
  styleUrls: ['./import-manual-source.component.css']
})
export class ImportManualSourceComponent implements OnInit {

  @Output() update = new EventEmitter<any>()
  @Input('data') set _data(data){
    this.data = _.cloneDeep(data) 
    if (this.data.file_id){
      this.imported = true
    }
  } 
  data

  importing = false
  imported = false
  
  url = environment.import + '?domainId=' + null;
  
  constructor(private ntf: NotificationService, private service: FileImportService) { 
  }

  ngOnInit(){
  }

  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status === 'uploading') {
      this.importing = true
    }
    if (status === 'done') {
      console.log(file)
      const result = file.response
      this.data.filename = file.name
      this.data.sheets = result.worksheets
      this.data.file_id = result.file_id 
      
      this.imported = true
      this.importing = false
      this.ntf.success(`${file.name} file uploaded successfully.`);

      this.disptach()
    } else if (status === 'error') {
      this.ntf.error(`${file.name} file upload failed.`);
      this.importing = false
    }
  }
  
  removeData(){
    delete this.data.filename
    delete this.data.sheets
    delete this.data.file_id
    delete this.data.sheetId
    delete this.data.sheet_id
    delete this.data.headers

    this.imported = false
    this.importing = false

    this.disptach()
  }
  
  onSheetSelected(e){
    this.data.sheetId = e.sheetId
    this.importing = true
    this.ntf.default('Preparing Dataset')
    this.service.generateSheet(this.data.file_id, this.data.sheetId, 0, 0 ,0 ,0).subscribe((generated_sheet:any)=>{
      this.service.getFileData(1, generated_sheet.sheet_id, 0).subscribe((data)=>{
        this.data.headers = data.headers
        this.importing = false
        this.data.sheet_id = generated_sheet.sheet_id
        this.ntf.success('Dataset ready')

        this.disptach()
      })

    }, err=> {this.imported = false})
  }

  disptach(){
    this.update.emit(this.data)
  }

  openConfig(){

  }

  resetRange(){
    
  }
}
