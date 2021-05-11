import { Component, OnInit } from '@angular/core';
import { Anonymization } from '../models/anonymization.model';
import { AppState } from '@app/core';
import { Store } from '@ngrx/store';
import { selectPipelineEditNodes } from '@app/datacapture/pages/automatic-upload/pipeline/store/pipeline.selectors';

@Component({
  selector: 'app-global-report',
  templateUrl: './global-report.component.html',
  styleUrls: ['./global-report.component.css']
})
export class GlobalReportComponent implements OnInit {

  tasks: any
  selectedNode = null
  anonymization: Anonymization[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.selectedNode = this.tasks[0]
    this.getAnonymization()

  }

  getAnonymization() {
    this.store.select(selectPipelineEditNodes).subscribe(
      (editNodes) => {
        editNodes.forEach(node => {
          if (node.type == "hash-by-category") {
            node.columns.forEach(col => {
              this.anonymization.push({ category: node.category, column: col })
            });
          }
        })
      }
    )
  }
}
