import * as go from "gojs";
import { PipelineNode } from "../node.model";

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static color = 'lightgreen'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.Left}]
}