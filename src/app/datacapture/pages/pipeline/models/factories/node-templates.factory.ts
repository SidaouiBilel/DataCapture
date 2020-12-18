import * as go from "gojs";
import { NodeDatasink } from "../nodes/datasink.model";
import { NodeDatasource } from "../nodes/datasources.model";
import { PipelineNode } from "../node.model";
import { NodeTransformations } from "../nodes/transformations.model";

export const nodeClasses = [NodeDatasource, NodeDatasink, NodeTransformations]

export function generateNodesTemplateMap(options={}){
  var templmap = new go.Map<string, go.Part>(); // In TypeScript you could write: new go.Map<string, go.Node>();
  // for each of the node categories, specify which template to use
  for (let c of nodeClasses){
        templmap.add(c.category , c.getNodeTemplate(options));
  }
    // for the default category, "", use the same template that Diagrams use by default;
    // this just shows the key value as a simple TextBlock
  templmap.add("", PipelineNode.getNodeTemplate(options));
  return templmap
}

