import * as go from "gojs";
import { NodeDatasink } from "../nodes/datasink.model";
import { NodeDatasource, NodeBlobStorage, NodeSQLImport } from "../nodes/datasources.model";
import { PipelineNode } from "../node.model";
import { NodeTransformationCalculator, NodeTransformationDefaultValue, NodeTransformationDeleteRow, NodeTransformationFilter, NodeTransformationFilterAndReplace, NodeTransformationFormatDate, NodeTransformationGroupBy, NodeTransformationMerge, NodeTransformationReplace, NodeTransformations, NodeTransformationSplitter } from "../nodes/transformations.model";
import { NodeConcat, NodeJoin, NodePycode } from "../nodes/other.model";
import { StorageAccountComponent } from "@app/shared/setup/nodes/datasources/azure/storage-account/storage-account.component";
import { SqlImportNodeComponent } from "@app/shared/setup/nodes/datasources/sql-import-node/sql-import-node.component";
import { NodePycodeComponent } from "@app/shared/setup/nodes/other/node-pycode/node-pycode.component";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";

export const NODE_OTHERS = [
  NodeConcat.setComponenet(BaseNodeTransformationComponent),
  NodeJoin.setComponenet(BaseNodeTransformationComponent),
  NodePycode.setComponenet(NodePycodeComponent)
] 
export const DATASOURCE_NODES = [
  NodeSQLImport.setComponenet(SqlImportNodeComponent), 
  NodeBlobStorage.setComponenet(StorageAccountComponent)
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

export const ALL_NODES = [...DATASOURCE_NODES, ...NODE_TRANSFORMERS, ...NODE_OTHERS]

export function generateNodesTemplateMap(options={}){
  var templmap = new go.Map<string, go.Part>();
  for (let c of ALL_NODES){
        templmap.add(c.type , c.getNodeTemplate(options));
  }
  templmap.add("", PipelineNode.getNodeTemplate(options));
  return templmap
}

