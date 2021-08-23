import { Component, OnInit } from '@angular/core';
import { CONNECTOR_TYPES } from '@app/datacapture/pages/connectors/models/connectors.model';

@Component({
  selector: 'app-export-datasink-modal',
  templateUrl: './export-datasink-modal.component.html',
  styleUrls: ['./export-datasink-modal.component.css']
})
export class ExportDatasinkModalComponent implements OnInit {

  step = 0
  types = [...CONNECTOR_TYPES]
  importType: string = this.types[0].type;
  btnGenerate = false

  constructor() { }

  ngOnInit(): void {
  }

}
