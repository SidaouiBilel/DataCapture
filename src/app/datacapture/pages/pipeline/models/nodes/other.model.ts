import { NodePycodeComponent } from "@app/shared/setup/nodes/other/node-pycode/node-pycode.component";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";

import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeConcat extends PipelineNode{
    static type = 'concat'
    static category = 'OTHER'
    static template_name = 'CONCAT'
    static color = 'green'
    static label = 'Concat'
    static ports = [
        {id:"INPUT",spot:go.Spot.TopLeft},
        {id:"CONCAT",spot:go.Spot.BottomLeft},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
    static component = BaseNodeTransformationComponent

    public static getNodeTemplate(options = {}){

        return $(go.Node, 'Spot',
                    {...options},
                    // new go.Binding("location", "Location", go.Point.parse).makeTwoWay(go.Point.stringify),
                    // new go.Binding("location", "loc").makeTwoWay(),
                    $(go.Panel, "Vertical",
                    $(go.Panel, "Auto",
                    $(go.Shape, "Rectangle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                            $(go.Picture, { desiredSize: new go.Size(40, 40), source: "assets/outline/account-book.svg" }),
                        )
                    ),
                    ...this.makePorts()
                )
    }
}

export class NodeJoin extends PipelineNode{
    static type = 'join'
    static category = 'OTHER'
    static template_name = 'JOIN'
    static color = 'greenyellow'
    static label = 'Join'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"JOIN",spot:go.Spot.BottomLeft},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
    static component = BaseNodeTransformationComponent
}

export class NodePycode extends PipelineNode{
    static type = 'pycode'
    static category = 'OTHER'
    static template_name = 'PYCODE'
    static color = 'red'
    static label = 'Pycode'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
    public static getNodeTemplate(options = {}){

        return $(go.Node, 'Spot',
                    {...options},
                    // new go.Binding("location", "Location", go.Point.parse).makeTwoWay(go.Point.stringify),
                    // new go.Binding("location", "loc").makeTwoWay(),
                    $(go.Panel, "Vertical",
                    $(go.Panel, "Auto",
                    $(go.Shape, "Circle", { fill: this.color, stroke: null }),
                            $(go.Picture, { desiredSize: new go.Size(40, 40), source: "assets/images/svg/python.svg" }),
                        )
                    ),
                    ...this.makePorts()
                )
    }

    static component = NodePycodeComponent
}

export const NODE_OTHERS = [
    NodeConcat,
    NodeJoin,
    NodePycode
] 