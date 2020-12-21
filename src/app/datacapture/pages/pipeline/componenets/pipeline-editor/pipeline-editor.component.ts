import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';
import { generateNodesTemplateMap } from '../../models/factories/node-templates.factory';

@Component({
  selector: 'app-pipeline-editor',
  templateUrl: './pipeline-editor.component.html',
  styleUrls: ['./pipeline-editor.component.css']
})
export class PipelineEditorComponent {

  constructor(public editor: PipelineEditorService, private cdr: ChangeDetectorRef) { }

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;

  @Input() diagramNodeData: Array<go.ObjectData> = [];
  @Input() diagramLinkData: Array<go.ObjectData> = [];
  @Output() diagramNodeDataChange: EventEmitter<Array<go.ObjectData>> = new EventEmitter<Array<go.ObjectData>>();
  @Output() diagramLinkDataChange: EventEmitter<Array<go.ObjectData>> = new EventEmitter<Array<go.ObjectData>>();

  public onDoubleClicked = new EventEmitter<void>()

  // initialize diagram / templates
  public initDiagram = (): go.Diagram => {

    const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          linkToPortIdProperty: 'toPort',
          linkFromPortIdProperty: 'fromPort',
          linkKeyProperty: 'key' // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
        }
      )
    });

    dia.commandHandler.archetypeGroupData = { key: 'Group', isGroup: true };

    // define the Node template
    const that: PipelineEditorComponent = this;
    dia.nodeTemplateMap = generateNodesTemplateMap({
      doubleClick: (e, node) => {
        that.editNode(node.data)
      }
    })

    dia.linkTemplate = $(go.Link,
      { curve: go.Link.OrientAlong },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

    return dia;
  }
  
  public diagramDivClassName: string = 'myDiagramDiv';
  public diagramModelData: any = { prop: 'value' };
  public skipsDiagramUpdate = false;

  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange (changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);

    // EMIT CHANGES TO MODEL
    this.emitChanges()
  };
  
  public emitChanges(){
    console.log('EMITTIND CGANGE')
    this.diagramNodeDataChange.emit(this.diagramNodeData)
    this.diagramLinkDataChange.emit(this.diagramLinkData)
  }

  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';
  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }
  public observedDiagram = null;

  // currently selected node; for inspector
  public selectedNode: go.Node | null = null;

  public ngAfterViewInit() {

    if (this.observedDiagram) return;
    this.observedDiagram = this.myDiagramComponent.diagram;
    this.cdr.detectChanges(); // IMPORTANT: without this, Angular will throw ExpressionChangedAfterItHasBeenCheckedError (dev mode only)

    const appComp: PipelineEditorComponent = this;
    // listener for inspector
    this.myDiagramComponent.diagram.addDiagramListener('ChangedSelection', function(e) {
      if (e.diagram.selection.count === 0) {
        appComp.selectedNode = null;
      }
      const node = e.diagram.selection.first();
      if (node instanceof go.Node) {
        appComp.selectedNode = node;
      } else {
        appComp.selectedNode = null;
      }
    });

  } // end ngAfterViewInit


  public handleInspectorChange(newNodeData) {
    const key = newNodeData.key;
    // find the entry in nodeDataArray with this key, replace it with newNodeData
    let index = null;
    for (let i = 0; i < this.diagramNodeData.length; i++) {
      const entry = this.diagramNodeData[i];
      if (entry.key && entry.key === key) {
        index = i;
      }
    }

    // here, we set skipsDiagramUpdate to false, since GoJS does not yet have this update
    this.skipsDiagramUpdate = false;
    const nodeCopy = _.cloneDeep(newNodeData)
    if (index === null) {
      this.diagramNodeData[this.diagramNodeData.length] = nodeCopy;
    } else {
      this.diagramNodeData[index] = nodeCopy;
    }

    this.emitChanges()
  }

  public addNode(node){
    this.handleInspectorChange(node)
  }

  public editNode (node) {
    this.editor.editNode(_.cloneDeep(node)).subscribe(newNode=>{
      this.handleInspectorChange(newNode)
    })
  };
}
