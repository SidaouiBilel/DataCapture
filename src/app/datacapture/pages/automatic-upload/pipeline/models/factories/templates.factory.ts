import * as go from "gojs";
import { PipelineNode } from "../node.model";
import { DATASOURCE_NODES, DATASINK_NODES, NODE_TRANSFORMERS, NODE_OTHERS } from "./node-classes.factory";


export const ALL_NODES = [...DATASOURCE_NODES,...DATASINK_NODES, ...NODE_TRANSFORMERS, ...NODE_OTHERS]

export function generateNodesTemplateMap(options={}){
  var templmap = new go.Map<string, go.Part>();
  for (let c of ALL_NODES){
        templmap.add(c.type , c.getNodeTemplate(options));
  }
  templmap.add("", PipelineNode.getNodeTemplate(options));
  return templmap
}