import { Component, OnInit } from '@angular/core';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import * as shape from 'd3-shape';

@Component({
  selector: 'app-pipeline-editor',
  templateUrl: './pipeline-editor.component.html',
  styleUrls: ['./pipeline-editor.component.css']
})
export class PipelineEditorComponent implements OnInit {

  constructor(public editor: PipelineEditorService) { }

  curve = shape.curveNatural
  
  startDrag(node) {
    this.editor.startDrag(node)
  }

  ngOnInit(): void {
  }
}
