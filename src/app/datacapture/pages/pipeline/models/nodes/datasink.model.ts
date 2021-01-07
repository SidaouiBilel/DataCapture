import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";
import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeDatasink extends PipelineNode{
    static type = 'DATASINK'
    static category = 'DATASINK'
    static template_name = 'DATASINK'
    static color = 'black'
    static icon = 'assets/images/svg/azure.svg'
    static label = 'Generic Datasink'
    static ports = [{id:"INPUT",spot:go.Spot.LeftCenter}]
    static component = BaseNodeTransformationComponent;

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Picture, { desiredSize: new go.Size(40, 40), source: this.icon, alignment: go.Spot.Center}),
                $(go.TextBlock,
                    {
                        name: 'TEXT',
                        font: this.fontFamily,
                        stroke: this.color,
                        maxSize: new go.Size(130, NaN),
                        alignment: go.Spot.BottomCenter,
                        margin: 14
                    },
                    new go.Binding("text", "label")
                ),
            ),
            ...this.makePorts()
        )
    }
}