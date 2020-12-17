import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineEditorComponent } from './containers/pipeline-editor/pipeline-editor.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PipelineNodeComponent } from './componenets/pipeline-node/pipeline-node.component';
import { PipelineEditorToolbarComponent } from './componenets/pipeline-editor-toolbar/pipeline-editor-toolbar.component';


@NgModule({
  declarations: [PipelineEditorComponent, PipelineNodeComponent, PipelineEditorToolbarComponent],
  imports: [
    CommonModule,
    PipelineRoutingModule,
    NgxGraphModule,
    SharedModule
  ]
})
export class PipelineModule { }
