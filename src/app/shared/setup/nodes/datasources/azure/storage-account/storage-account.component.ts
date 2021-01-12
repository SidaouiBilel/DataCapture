import { Component, OnInit } from '@angular/core';
import { ConnectorsService } from '@app/datacapture/pages/connectors/services/connectors.service';
import { PipelineNodeComponent } from '@app/datacapture/pages/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { BehaviorSubject } from 'rxjs';
import { AzureConnectorService } from './services/azure-connector.service';

@Component({
  selector: 'app-storage-account',
  templateUrl: './storage-account.component.html',
  styleUrls: ['./storage-account.component.css']
})
export class StorageAccountComponent extends PipelineNodeComponent {

  constructor(private con: AzureConnectorService, private connectors: ConnectorsService) { 
    super()
  }

  containers$ = new BehaviorSubject<any>(null)
  blobs$ = new BehaviorSubject<any>(null)

  getConnectors(){
    
  }

  onConatinersOpen(){
    this.containers$.next(null)
    this.con.getContainers(this.data.conn_string).subscribe(e=>this.containers$.next(e)) 
  }
  
  onBlobOpen(){
    this.blobs$.next(null)
    this.con.getBlobs(this.data.conn_string, this.data.container).subscribe(e=>this.blobs$.next(e)) 
  }
}
