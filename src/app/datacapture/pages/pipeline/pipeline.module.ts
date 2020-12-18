import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipelineRoutingModule } from './pipeline-routing.module';
import { PipelineEditorComponent } from './componenets/pipeline-editor/pipeline-editor.component';
import { SharedModule } from '@app/shared/shared.module';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { PipelineNodeComponent } from './componenets/pipeline-editor/pipeline-node/pipeline-node.component';

import { GojsAngularModule } from 'gojs-angular';
import { PipelineEditorSidebarComponent } from './componenets/pipeline-editor/pipeline-editor-sidebar/pipeline-editor-sidebar.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { PiplineTemplateViewerComponent } from './componenets/pipeline-editor/pipline-template-viewer/pipline-template-viewer.component';
import { AuthorPipelineComponent } from './containers/author-pipeline/author-pipeline.component';

// TODO REMOVE NGX PIPELINE FROM PACKAGE
@NgModule({
  declarations: [PipelineEditorComponent, PipelineNodeComponent, PipelineEditorSidebarComponent, PiplineTemplateViewerComponent, AuthorPipelineComponent],
  imports: [
    CommonModule,
    PipelineRoutingModule,
    SharedModule,
    GojsAngularModule,
    NgxJsonViewerModule,
  ]
})
export class PipelineModule { }
