import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@app/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';
import { env as environment } from '@app/env.service';

@Component({
  selector: 'app-manual-import-node',
  templateUrl: './manual-import-node.component.html',
  styleUrls: ['./manual-import-node.component.css']
})
export class ManualImportNodeComponent extends PipelineNodeComponent implements OnInit {

  importing = false
  imported = false
  
  url = environment.import + '?domainId=' + null;
  
  constructor(private ntf: NotificationService, private service: FileImportService) { 
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

    this.imported = false
    this.importing = false
  }
  
  onSheetSelected(e){
    this.data.sheetId = e.sheetId
    this.importing = true
    this.ntf.default('Preparing Dataset')
    this.service.generateSheet(this.data.file_id, this.data.sheetId, 0, 0 ,0 ,0).subscribe((generated_sheet:any)=>{
      this.importing = false
      this.data.sheet_id = generated_sheet.sheet_id
      this.ntf.success('Dataset ready')
    }, err=> this.imported = false)
  }
}
