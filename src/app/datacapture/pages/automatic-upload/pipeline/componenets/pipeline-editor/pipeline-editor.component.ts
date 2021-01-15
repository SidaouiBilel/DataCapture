import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PipelineEditorService } from '../../services/pipeline-editor.service';
import { DataSyncService, DiagramComponent } from 'gojs-angular';
import * as go from 'gojs';
import * as _ from 'lodash';
import { generateNodesTemplateMap } from '../../models/factories/templates.factory';
import { ToMap } from '@app/shared/utils/arrays.utils';

const $ = go.GraphObject.make;

@Component({
  selector: 'app-pipeline-editor',
  templateUrl: './pipeline-editor.component.html',
  styleUrls: ['./pipeline-editor.component.css']
})
export class PipelineEditorComponent implements AfterViewInit{

  constructor(public editor: PipelineEditorService, private cdr: ChangeDetectorRef) { }

  @ViewChild('myDiagram', { static: true }) public myDiagramComponent: DiagramComponent;

  @Input("run") set _run(run){
    this.diagramModelData.run=run

    this.skipsDiagramUpdate = false;
  };
  @Input() diagramNodeData: Array<go.ObjectData> = [];
  @Input() diagramLinkData: Array<go.ObjectData> = [];
  @Output() diagramNodeDataChange: EventEmitter<Array<go.ObjectData>> = new EventEmitter<Array<go.ObjectData>>();
  @Output() diagramLinkDataChange: EventEmitter<Array<go.ObjectData>> = new EventEmitter<Array<go.ObjectData>>();

  public onDoubleClicked = new EventEmitter<void>();
  public diagramDivClassName = 'myDiagramDiv';
  public diagramModelData: go.ObjectData = { prop: 'value' };
  public skipsDiagramUpdate = false;
  public observedDiagram = null;
  // currently selected node; for inspector
  public selectedNode: go.Node | null = null;
  // Overview Component testing
  public oDivClassName = 'myOverviewDiv';

  // initialize diagram / templates
  public initDiagram = (): go.Diagram => {

    // const $ = go.GraphObject.make;
    const dia = $(go.Diagram, {
      'undoManager.isEnabled': true,
      model: $(go.GraphLinksModel,
        {
          nodeCategoryProperty: "type",
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
        that.editNode(node.data);
      }
    },
    [
      (cls)=>$(go.Panel,
        $(go.Shape, cls.shape, {
          desiredSize: new go.Size(cls.shapeSize, cls.shapeSize),
          fill: null,
          stroke: null,
          strokeWidth:5,
          },
          new go.Binding("stroke", "run", (run, target)=>{
            const node = target.part.data
            const id = node.key
            console.log(node, run)
            const task = run.tasks.find(t=>t.task_id==id)
            if (task){
              switch(task.state){
                case 'success': return 'lightgreen'
                case 'running': return 'lightblue'
                case 'failed': return 'red'
                case 'scheduled': return 'lightgrey'
                case 'queued': return 'skyblue'
                default: return null
              }
            } else {
              return null
            }
          }).ofModel() 
        ),
      ),
      // (cls)=>$(go.Panel,{padding:4 , alignment: go.Spot.Top, alignmentFocus: go.Spot.Bottom},
      //   $(go.TextBlock,new go.Binding("text", "run", (run, target)=>{
      //     const node = target.part.data
      //     const id = node.key
      //     console.log(node, run)
      //     const task = run.tasks.find(t=>t.task_id==id)
      //     if (task){
      //       return task.state
      //     } else {
      //       return ""
      //     }
      //   }).ofModel() 
      //   )
      // )
    ]
    );

    // dia.linkTemplate =  $(go.Link,
    //   { routing: go.Link.AvoidsNodes,
    //     corner: 10 },                  // rounded corners
    //   $(go.Shape),
    //   $(go.Shape, { toArrow: "Standard" })
    // );
    dia.linkTemplate =  $(go.Link,
      { curve: go.Link.Bezier },
      $(go.Shape),
      $(go.Shape, { toArrow: "Standard" })
    );

    return dia;
  }

  public ngAfterViewInit() {
    if (this.observedDiagram) {return; }
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

  // When the diagram model changes, update app data to reflect those changes
  public diagramModelChange(changes: go.IncrementalData) {
    // when setting state here, be sure to set skipsDiagramUpdate: true since GoJS already has this update
    // (since this is a GoJS model changed listener event function)
    // this way, we don't log an unneeded transaction in the Diagram's undoManager history
    this.skipsDiagramUpdate = true;

    this.diagramNodeData = DataSyncService.syncNodeData(changes, this.diagramNodeData);
    this.diagramLinkData = DataSyncService.syncLinkData(changes, this.diagramLinkData);
    this.diagramModelData = DataSyncService.syncModelData(changes, this.diagramModelData);

    // EMIT CHANGES TO MODEL
    this.emitChanges();
  }

  public emitChanges(){
    this.diagramNodeDataChange.emit(this.diagramNodeData);
    this.diagramLinkDataChange.emit(this.diagramLinkData);
  }

  public initOverview(): go.Overview {
    const $ = go.GraphObject.make;
    const overview = $(go.Overview);
    return overview;
  }

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
    const nodeCopy = _.cloneDeep(newNodeData);
    if (index === null) {
      this.diagramNodeData[this.diagramNodeData.length] = nodeCopy;
    } else {
      this.diagramNodeData[index] = nodeCopy;
    }
    this.emitChanges();
  }

  public addNode(node){
    this.handleInspectorChange(node);
  }

  public editNode(node) {
    this.editor.editNode(_.cloneDeep(node)).subscribe(newNode => {
      this.handleInspectorChange(newNode);
    });
  }

  redrawDiagram() {
    // const dia = this.myDiagramComponent.diagram
    // if(dia){
    //   dia.requestUpdate()
    // }
  }
}
