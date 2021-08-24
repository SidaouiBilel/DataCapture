import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodeSQLImport } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { ConnectorPreviewComponent } from '@app/shared/connector-preview/connector-preview.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sql-import-node',
  templateUrl: './sql-import-node.component.html',
})
export class SqlImportNodeComponent extends PipelineNodeComponent implements AfterViewInit {
  @Input() btnGenerate = false;
  @ViewChild("preview") preview: ConnectorPreviewComponent 
  
  nodeClass: any  = NodeSQLImport

  constructor(private connectors: ConnectorsService) {
    super()
  }

  editorOptions = {language: 'sql'};

  ngOnInit(){
    super.ngOnInit()
    this.getConnectors()
  }

  ngAfterViewInit() {
    this.previewCheck()
  }

  connectors$

  getConnectors(){
    this.connectors$ = this.connectors.getAllByType(this.nodeClass.connectorDef.type).pipe(take(1))
  }


  getWith(type){
    return this.data.get_with==type
  }

  previewCheck(){
    if (this.data) {
      if (this.data.connector_id){
        if ( this.getWith("query") && this.data.query ){
          return this.preview.fetchData(this.data)
        }
      }
    }

    this.preview.clearData()
  }

  onDataChanged(){
    this.previewCheck()
  }
}
