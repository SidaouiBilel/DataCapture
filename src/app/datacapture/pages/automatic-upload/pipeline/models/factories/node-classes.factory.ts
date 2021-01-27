import { NodeBlobStorageUpload, NodeCollectionUpload, NodePostgresUpload, NodeSQLUpload } from "../nodes/datasink.model";
import { NodeBlobStorage, NodeCollectionImport, NodePostgresImport, NodeSQLImport } from "../nodes/datasources.model";
import { NodeTransformationCalculator, NodeTransformationDefaultValue, NodeTransformationDeleteRow, NodeTransformationFilter, NodeTransformationFilterAndReplace, NodeTransformationFormatDate, NodeTransformationGroupBy, NodeTransformationHash, NodeTransformationMerge, NodeTransformationReplace, NodeTransformations, NodeTransformationSplitter } from "../nodes/transformations.model";
import { NodeConcat, NodeJoin, NodePycode, NodeTransformationPipeline } from "../nodes/other.model";
import { StorageAccountImportNodeComponent } from "@app/shared/setup/nodes/datasources/azure/storage-account/storage-account.component";
import { SqlImportNodeComponent } from "@app/shared/setup/nodes/datasources/sql-import-node/sql-import-node.component";
import { NodePycodeComponent } from "@app/shared/setup/nodes/other/node-pycode/node-pycode.component";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import { SqlUploadNodeComponent } from "@app/shared/setup/nodes/datasinks/sql-upload-node/sql-upload-node.component";
import { StorageAccountUploadNodeComponent } from "@app/shared/setup/nodes/datasinks/storage-account-upload-node/storage-account-upload-node.component";
import { PostgresImportNodeComponent } from "@app/shared/setup/nodes/datasources/postgres-import-node/postgres-import-node.component";
import { PostgresUploadNodeComponent } from "@app/shared/setup/nodes/datasinks/postgres-upload-node/postgres-upload-node.component";

export const NODE_OTHERS = [
  NodeConcat.setComponenet(BaseNodeTransformationComponent),
  NodeJoin.setComponenet(BaseNodeTransformationComponent),
  NodePycode.setComponenet(NodePycodeComponent),
  NodeTransformationPipeline.setComponenet(BaseNodeTransformationComponent)
] 
export const DATASOURCE_NODES = [
  NodeCollectionImport.setComponenet(BaseNodeTransformationComponent),
  NodeSQLImport.setComponenet(SqlImportNodeComponent), 
  NodePostgresImport.setComponenet(PostgresImportNodeComponent), 
  NodeBlobStorage.setComponenet(StorageAccountImportNodeComponent),
]
export const DATASINK_NODES = [
  NodeCollectionUpload.setComponenet(BaseNodeTransformationComponent), 
  NodeSQLUpload.setComponenet(SqlUploadNodeComponent),
  NodePostgresUpload.setComponenet(PostgresUploadNodeComponent),
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
              ,NodeTransformationHash
          ].map(cls =>{
              cls.setComponenet(cls.component)
              return cls
          })


export const ALL_NODES = [...DATASOURCE_NODES,...DATASINK_NODES, ...NODE_TRANSFORMERS, ...NODE_OTHERS]

export function getNodeClassBy(type){
  return ALL_NODES.find(e=>e.type===type)
}
