import * as go from "gojs";
import { PipelineNode } from "../node.model";

export class NodeTransformations extends PipelineNode{
    static type = 'TRANSFORMATION'
    static category = 'TRANSFORMATION'
    static color = 'grey'
    static label = 'Generic Transformation'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
}