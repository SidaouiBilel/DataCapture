import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static template_name = 'DATASINK'
    static color = 'red'
    static icon = 'assets/images/svg/sync.svg'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}]
    static component = BaseNodeTransformationComponent;

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", { fill: this.color, stroke: null,  desiredSize: new go.Size(40, 40) }),
                    $(go.Picture, { desiredSize: new go.Size(24, 24), source: this.icon, margin: 8 }),
                )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts()
        )
    }
}