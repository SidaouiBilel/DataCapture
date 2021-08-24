import { Component } from '@angular/core';
import { NodeOracleImport } from '@app/datacapture/pages/automatic-upload/pipeline/models/nodes/datasources.model';
import { SqlImportNodeComponent } from '../sql-import-node/sql-import-node.component';

@Component({
  selector: 'app-oracle-import-node',
  templateUrl: '../sql-import-node/sql-import-node.component.html',
})
export class OracleImportNodeComponent extends SqlImportNodeComponent {
  nodeClass = NodeOracleImport
}
