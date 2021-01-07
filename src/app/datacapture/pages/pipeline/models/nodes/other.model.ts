import { NodePycodeComponent } from "@app/shared/setup/nodes/other/node-pycode/node-pycode.component";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";

import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeConcat extends PipelineNode{
    static type = 'concat'
    static category = 'OTHER'
    static template_name = 'CONCAT'
    static color = 'black'
    static icon = 'assets/images/svg/concat.svg';
    static label = 'Concat'
    static ports = [
        {id:"INPUT",spot:go.Spot.TopLeft},
        {id:"CONCAT",spot:go.Spot.LeftCenter},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]
    static component = BaseNodeTransformationComponent

    public static getNodeTemplate(options = {}){

        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Picture, { desiredSize: new go.Size(40, 40), source: this.icon}),
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

export class NodeJoin extends PipelineNode{
    static type = 'join'
    static category = 'OTHER'
    static template_name = 'JOIN'
    static color = '#000';
    static icon = 'assets/images/svg/join.svg';
    static label = 'Join'
    static ports = [
        {id:"INPUT",spot:go.Spot.TopLeft},
        {id:"JOIN",spot:go.Spot.LeftCenter},
        {id:"OUTPUT",spot:go.Spot.RightCenter},
    ]
    static component = BaseNodeTransformationComponent;
    public static getNodeTemplate(options = {}){

        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Picture, { desiredSize: new go.Size(40, 40), source: this.icon}),
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

export class NodePycode extends PipelineNode{
    static type = 'pycode'
    static category = 'OTHER'
    static template_name = 'PYCODE'
    static color = 'black';
    static icon = 'assets/images/svg/python.svg';
    static label = 'Pycode'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ];

    static component = NodePycodeComponent;

    public static getNodeTemplate(options = {}){

        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Picture, { desiredSize: new go.Size(40, 40), source: this.icon}),
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

export const NODE_OTHERS = [
    NodeConcat,
    NodeJoin,
    NodePycode
] 