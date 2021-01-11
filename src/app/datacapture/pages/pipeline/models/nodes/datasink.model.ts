import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static template_name = 'DATASINK'
    static color = 'green'
    static icon = 'assets/images/svg/sync.svg'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}]
    static component = BaseNodeTransformationComponent;

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Panel, "Auto",
                        $(go.Shape, "Circle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                        $(go.Picture, { desiredSize: new go.Size(32, 32), source: this.icon, margin: 8 }),
                    ),
                ),
                // $(go.TextBlock,
                //     {
                //         name: this.label,
                //         margin: 6, font: "12px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB'",
                //         stroke: "black", maxSize: new go.Size(130, NaN),
                //         alignment: go.Spot.Center
                //     },
                //     new go.Binding("text", "label")
                // ),
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts(),
        )
    }
}