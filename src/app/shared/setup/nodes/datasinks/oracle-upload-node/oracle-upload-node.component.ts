import { Component, OnInit } from '@angular/core';
import { NodeOracleUpload } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasink.model';
import { SqlUploadNodeComponent } from '../sql-upload-node/sql-upload-node.component';

@Component({
  selector: 'app-oracle-upload-node',
  templateUrl: './../sql-upload-node/sql-upload-node.component.html',
})
export class OracleUploadNodeComponent extends SqlUploadNodeComponent {
  nodeClass:any = NodeOracleUpload
}