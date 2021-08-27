import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_ORACLE_DB, CONNECTOR_DEF_POSTGRES, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static shape = 'RoundedRectangle'
    static color = 'green'
    static icon = 'assets/images/svg/sync.svg'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}]
    static showLabel = true
    static component = BaseNodeTransformationComponent;

    public static getNodeOptions(){
        return {
            contextMenu:                            // define a context menu for each node
              $("ContextMenu", "Spot",              // that has several buttons around
                $(go.Placeholder, { padding: 5 }),  // a Placeholder object
                $("ContextMenuButton", 
                $(go.TextBlock, "Toggle Output", new go.Binding('text', "show_output", (show_output)=>(show_output)?'Remove Output':'Add Output')),
                  {click: (e, obj)=>{
                    var myDiagram = e.diagram 
                    myDiagram.startTransaction("addOutputPort");
                    myDiagram.selection.each(function(node) {
                        if (!(node instanceof go.Node)) return;
                        var visibility = (node.data.show_output)? 0: 1;
                        myDiagram.model.setDataProperty(node.data, "show_output", visibility)
                    });
                    myDiagram.commitTransaction("addOutputPort");
                  } })
              )  // end Adornment
          }
    }

    public static makePorts(){
        return [...super.makePorts(),
            $(go.Shape, 'Circle',
            {
                visible: false,
            opacity: 1,
            fill: this.color,
            strokeWidth: 2,
            stroke:"white",
            desiredSize: new go.Size(10,10),
            portId: "OUTPUT", 
            alignment: go.Spot.RightCenter,
            fromLinkable: true,
            toLinkable: true
        },
        new go.Binding("visible", "show_output"),
        this.runBinding('fill')
        )
            ]
            }
        }
        
    export class NodeUploadConnector extends NodeDatasink{
        static connectorDef:any
    
    static type = "UPLOAD_CONNECTOR"

    public static createNode(){
        const connector_data = {
            connector_type: this.connectorDef.type
        }   
        return {...super.createNode(), ...connector_data}
    }
}

export class NodeCollectionUpload extends NodeDatasink{
    static type = "COLLECTION_UPLOAD"    
    static nzicon = 'folder'
    static label = "Collection"
}


export class NodeBlobStorageUpload extends NodeUploadConnector{
    static type = "BLOB_STORAGE_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_BLOB_STORAGE    
}

export class NodeSQLUpload extends NodeUploadConnector{
    static type = "SQL_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_SQL

}

export class NodePostgresUpload extends NodeUploadConnector{
    static type = "POSTGRES_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_POSTGRES
}

export class NodeOracleUpload extends NodeUploadConnector{
    static type = "ORACLE_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_ORACLE_DB    
}


for (let cls of [NodeBlobStorageUpload, NodeSQLUpload, NodePostgresUpload, NodeOracleUpload]){
    cls.nzicon = cls.connectorDef.icon
    cls.label = cls.connectorDef.label
}