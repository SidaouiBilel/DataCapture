import { NodeCheckSocial } from './../nodes/categorization.model';
import { NodeCheckComponent } from './../../../../../../shared/setup/nodes/category/node-check/node-check.component';
import { NodeBlobStorageUpload, NodeCollectionUpload, NodePostgresUpload, NodeSQLUpload } from "../nodes/datasink.model";
import { NodeBlobStorage, NodeCollectionImport, NodeManualImport, NodePostgresImport, NodeSQLImport } from "../nodes/datasources.model";
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
import { CollectionUploadComponent } from "@app/shared/setup/nodes/datasinks/collection-upload/collection-upload.component";
import { CollectionImportComponent } from "@app/shared/setup/nodes/datasources/collection-import/collection-import.component";
import { NodeJoinComponent } from "@app/shared/setup/nodes/other/node-join/node-join.component";
import { NodePipelineComponent } from "@app/shared/setup/nodes/other/node-pipeline/node-pipeline.component";
import { ManualImportNodeComponent } from "@app/shared/setup/nodes/datasources/manual-import-node/manual-import-node.component";
import { NodeCheckRsu, NodeFilterByCategory, NodeHashByCategory } from "../nodes/categorization.model";
import { CategoryFilterComponent } from "@app/shared/setup/nodes/category/category-filter/category-filter.component";
import { CategoryHashComponent } from "@app/shared/setup/nodes/category/category-hash/category-hash.component";
import { NodeCheckSocialComponent } from '@app/shared/setup/nodes/category/node-check-social/node-check-social.component';

export const NODE_OTHERS = [
  NodeConcat.setComponenet(BaseNodeTransformationComponent),
  NodeJoin.setComponenet(NodeJoinComponent),
  NodePycode.setComponenet(NodePycodeComponent),
  NodeTransformationPipeline.setComponenet(NodePipelineComponent)
]
export const DATASOURCE_NODES = [
  NodeCollectionImport.setComponenet(CollectionImportComponent),
  NodeSQLImport.setComponenet(SqlImportNodeComponent),
  NodePostgresImport.setComponenet(PostgresImportNodeComponent),
  NodeBlobStorage.setComponenet(StorageAccountImportNodeComponent),
  NodeManualImport.setComponenet(ManualImportNodeComponent),
]
export const DATASINK_NODES = [
  NodeCollectionUpload.setComponenet(CollectionUploadComponent),
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

export const CATEGORY_NODES = [
  NodeFilterByCategory.setComponenet(CategoryFilterComponent),
  NodeHashByCategory.setComponenet(CategoryHashComponent),
  NodeCheckRsu.setComponenet(NodeCheckComponent),
  NodeCheckSocial.setComponenet(NodeCheckSocialComponent)
]

export const ALL_NODES = [...DATASOURCE_NODES,...DATASINK_NODES, ...NODE_TRANSFORMERS, ...NODE_OTHERS, ...CATEGORY_NODES]

export function getNodeClassBy(type){
  return ALL_NODES.find(e=>e.type===type)
}
