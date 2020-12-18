import * as go from "gojs";
import { PipelineNode } from "../node.model";

export class NodeDatasource extends PipelineNode{
    static type = 'DATASOURCE'
    static category = 'DATASOURCE'
    static color = 'lightblue'
    static label = 'Generic Datasource'
    static ports = [{id:"OUTPUT",spot:go.Spot.Right}]
}