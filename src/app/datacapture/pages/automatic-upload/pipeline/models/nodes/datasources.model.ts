import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_POSTGRES, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    static shape = 'RoundedRectangle'
    static color = '#1ca5cc'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.RightCenter}]
    static showLabel = true
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
}

export class NodeBlobStorage extends NodeImportConnector{
    static type = "BLOB_STORAGE_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_BLOB_STORAGE    
}

export class NodeSQLImport extends NodeImportConnector{
    static type = "SQL_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_SQL
}

export class NodePostgresImport extends NodeImportConnector{
    static type = "POSTGRES_IMPORT_CONNECTOR"
    static connectorDef = CONNECTOR_DEF_POSTGRES
}

// SET UP NODE METADATA
for (let cls of [NodeBlobStorage, NodeSQLImport, NodePostgresImport]){
    cls.icon = cls.connectorDef.svgWhite
    cls.label = cls.connectorDef.label
}