import { Component, Input, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { NodePostgresImport } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { take } from 'rxjs/operators';
import { SqlImportNodeComponent } from '../sql-import-node/sql-import-node.component';

@Component({
  selector: 'app-postgres-import-node',
  templateUrl: '../sql-import-node/sql-import-node.component.html',
})
export class PostgresImportNodeComponent extends SqlImportNodeComponent {
  nodeClass = NodePostgresImport
 }

