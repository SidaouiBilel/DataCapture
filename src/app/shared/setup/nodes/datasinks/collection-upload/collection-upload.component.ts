import { Component, OnInit } from '@angular/core';
import { PipelineNodeComponent } from '@app/datacapture/pages/automatic-upload/pipeline/componenets/pipeline-editor/pipeline-node/pipeline-node.component';
import { FileImportService } from '@app/datacapture/pages/upload/services/file-import.service';

@Component({
  selector: 'app-collection-upload',
  templateUrl: './collection-upload.component.html',
  styleUrls: ['./collection-upload.component.css']
})
export class CollectionUploadComponent extends PipelineNodeComponent {
  keys = Object.keys;
  domains = [];
  constructor(private service: FileImportService) {
    super();
    
    this.service.getAllSuper().subscribe((domains: any) => {
      this.domains = domains.resultat;
    });
  }

  save() {
    this.onSave.emit(this.data)
  }

  selectDomain(domain) {
    this.data.domain_id = domain.identifier;
    this.data.domain = domain;
  }

}
