import { Component, OnInit } from '@angular/core';
import { PipelineEditorService } from '../../services/pipeline-editor.service';

@Component({
  selector: 'app-pipeline-editor-toolbar',
  templateUrl: './pipeline-editor-toolbar.component.html',
  styleUrls: ['./pipeline-editor-toolbar.component.css']
})
export class PipelineEditorToolbarComponent implements OnInit {

  constructor(public editor: PipelineEditorService) { }

  ngOnInit(): void {
  }

  source
  target
}
