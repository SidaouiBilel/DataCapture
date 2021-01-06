import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static template_name = 'DATASINK'
    static color = 'green'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.Left}]
    static component = BaseNodeTransformationComponent
}