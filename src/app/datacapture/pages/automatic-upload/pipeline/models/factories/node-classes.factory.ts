import { NodeBlobStorageUpload, NodeSQLUpload } from "../nodes/datasink.model";
import { NodeBlobStorage, NodeSQLImport } from "../nodes/datasources.model";
import { NodeTransformationCalculator, NodeTransformationDefaultValue, NodeTransformationDeleteRow, NodeTransformationFilter, NodeTransformationFilterAndReplace, NodeTransformationFormatDate, NodeTransformationGroupBy, NodeTransformationMerge, NodeTransformationReplace, NodeTransformations, NodeTransformationSplitter } from "../nodes/transformations.model";
import { NodeConcat, NodeJoin, NodePycode } from "../nodes/other.model";
import { StorageAccountImportNodeComponent } from "@app/shared/setup/nodes/datasources/azure/storage-account/storage-account.component";
import { SqlImportNodeComponent } from "@app/shared/setup/nodes/datasources/sql-import-node/sql-import-node.component";
import { NodePycodeComponent } from "@app/shared/setup/nodes/other/node-pycode/node-pycode.component";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import { SqlUploadNodeComponent } from "@app/shared/setup/nodes/datasinks/sql-upload-node/sql-upload-node.component";
import { StorageAccountUploadNodeComponent } from "@app/shared/setup/nodes/datasinks/storage-account-upload-node/storage-account-upload-node.component";

export const NODE_OTHERS = [
  NodeConcat.setComponenet(BaseNodeTransformationComponent),
  NodeJoin.setComponenet(BaseNodeTransformationComponent),
  NodePycode.setComponenet(NodePycodeComponent)
] 
export const DATASOURCE_NODES = [
  NodeSQLImport.setComponenet(SqlImportNodeComponent), 
  NodeBlobStorage.setComponenet(StorageAccountImportNodeComponent)
]
export const DATASINK_NODES = [
  NodeSQLUpload.setComponenet(SqlUploadNodeComponent),
  NodeBlobStorageUpload.setComponenet(StorageAccountUploadNodeComponent), 
]
export const NODE_TRANSFORMERS = [
              NodeTransformationFilter
              ,NodeTransformationFilterAndReplace
              ,NodeTransformationMerge
              ,NodeTransformationReplace
              ,NodeTransformationDeleteRow
              ,NodeTransformationDefaultValue
              ,NodeTransformationSplitter
              ,NodeTransformationCalculator
              ,NodeTransformationFormatDate
              ,NodeTransformationGroupBy
          ].map(cls =>{
              const t = new cls.transformer()
              cls.type = t.type
              cls.label = t.label
              cls.setComponenet(BaseNodeTransformationComponent)
              return cls
          })

export const ALL_NODES = [...DATASOURCE_NODES,...DATASINK_NODES, ...NODE_TRANSFORMERS, ...NODE_OTHERS]

export function getNodeClassBy(type){
  return ALL_NODES.find(e=>e.type===type)
}