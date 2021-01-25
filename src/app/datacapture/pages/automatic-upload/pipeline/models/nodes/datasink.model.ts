import { CONNECTOR_DEF_BLOB_STORAGE, CONNECTOR_DEF_POSTGRES, CONNECTOR_DEF_SQL } from "@app/datacapture/pages/connectors/models/connectors.model";
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

for (let cls of [NodeBlobStorageUpload, NodeSQLUpload, NodePostgresUpload]){
    cls.nzicon = cls.connectorDef.icon
    cls.label = cls.connectorDef.label
}