import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { environment } from '@env/environment';
import { NzModalService } from 'ng-zorro-antd';
import * as _ from 'lodash'
import { DatasetComponent } from '@app/shared/dataset/dataset.component';

@Component({
  selector: 'app-manual-import-node',
  templateUrl: './manual-import-node.component.html',
  styleUrls: ['./manual-import-node.component.css']
})
export class ManualImportNodeComponent extends PipelineNodeComponent implements OnInit {

  @Output() update = new EventEmitter<any>()
  data

  importing = false
  imported = false

  url = environment.import + '?domainId=' + null;

  constructor(private ntf: NotificationService, private service: FileImportService, private modal: NzModalService) {
    super()
  }

  ngOnInit(){
    if (this.data.file_id){
      this.imported = true
    }
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

  onSheetSelected(sheetData){
    this.data.sheetId = sheetData.sheetId

    this.importing = true
    const row_range = this.data.row_range || [0,0]
    const col_range = this.data.col_range || [0,0]
    this.service.generateSheet(this.data.file_id, this.data.sheetId, col_range[0], col_range[1] ,row_range[0], row_range[1]).subscribe((generated_sheet:any)=>{
      this.service.getFileData(1, generated_sheet.sheet_id, 0).subscribe((data)=>{
        // this.data.headers = data.headers
        this.importing = false
        this.data.sheet_id = generated_sheet.sheet_id
        this.ntf.success('Dataset ready')
        this.data.label = sheetData.sheetName

        this.disptach()
      })

    }, err=> {this.imported = false})
  }

  disptach(){
    this.update.emit(this.data)
  }


  openConfig(): void {
    const row_range = this.data.row_range || [0,0]
    const col_range = this.data.col_range || [0,0]

    const modal = this.modal.create({
      nzTitle: 'Dataset Ranges',
      nzContent: DatasetComponent,
      nzComponentParams:{
        colValue:col_range,
        rowValue:row_range
      },
      nzClosable: false,
      nzWrapClassName: 'vertical-center-modal',
      nzWidth: 'xXL',
      nzOnOk: componentInstance => {
        this.onRangeSelected(componentInstance.rowValue, componentInstance.colValue)
      }
    });
  }

  onRangeSelected(row_range, col_range){
      this.data.row_range = row_range
      this.data.col_range = col_range

      const sheetId = this.data.sheetId
      const sheetName = this.data.label
      if(sheetId){
        this.onSheetSelected({sheetId, sheetName})
      } else {
        this.disptach()
      }
  }

}
