import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    
    static color = 'green'
    static icon = 'assets/images/svg/sync.svg'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}]
    static component = BaseNodeTransformationComponent;
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

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "RoundedRectangle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                    $(go.Picture, { desiredSize: new go.Size(40,40), source: this.connectorDef.svgWhite , margin: 8 }),
                ),
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "label")))},
            ...this.makePorts(),
        )
    }
}

export class NodeBlobStorageUpload extends NodeUploadConnector{
    static label = CONNECTOR_DEF_BLOB_STORAGE.label
    static type = "BLOB_STORAGE_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_BLOB_STORAGE    
}

export class NodeSQLUpload extends NodeUploadConnector{
    static label = CONNECTOR_DEF_SQL.label
    static type = "SQL_UPLOAD_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_SQL

}