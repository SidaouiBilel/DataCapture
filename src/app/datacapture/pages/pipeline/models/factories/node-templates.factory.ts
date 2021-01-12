import * as go from "gojs";
import { NodeDatasink } from "../nodes/datasink.model";
import { NodeDatasource, NodeBlobStorage, DATASOURCE_NODES } from "../nodes/datasources.model";
import { PipelineNode } from "../node.model";
import { NodeTransformations, NODE_TRANSFORMERS } from "../nodes/transformations.model";
import { NODE_OTHERS } from "../nodes/other.model";

export const nodeClasses = [...DATASOURCE_NODES, NodeDatasink, ...NODE_TRANSFORMERS, ...NODE_OTHERS]

export function generateNodesTemplateMap(options={}){
  var templmap = new go.Map<string, go.Part>(); // In TypeScript you could write: new go.Map<string, go.Node>();
  // for each of the node categories, specify which template to use
  for (let c of nodeClasses){
        templmap.add(c.type , c.getNodeTemplate(options));
  }
    // for the default category, "", use the same template that Diagrams use by default;
    // this just shows the key value as a simple TextBlock
  templmap.add("", PipelineNode.getNodeTemplate(options));
  return templmap
}

