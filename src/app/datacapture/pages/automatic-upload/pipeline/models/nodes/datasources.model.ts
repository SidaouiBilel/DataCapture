import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    
    static color = '#1ca5cc'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.RightCenter}]
}

export class NodeImportConnector extends NodeDatasource{
    static connectorDef:any
    
    static type = "IMPORT_CONNECTOR"

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

export class NodeBlobStorage extends NodeImportConnector{
    static label = CONNECTOR_DEF_BLOB_STORAGE.label
    static type = "BLOB_STORAGE_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_BLOB_STORAGE    
}

export class NodeSQLImport extends NodeImportConnector{
    static label = CONNECTOR_DEF_SQL.label
    static type = "SQL_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_SQL

}