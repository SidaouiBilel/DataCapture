
import * as go from "gojs";
import { PipelineNode } from "../node.model";

const $ = go.GraphObject.make;

export class NodeConcat extends PipelineNode{
    static type = 'concat'
    static category = 'MERGE'
    
    static icon = 'assets/images/svg/concat.svg';
    static color = 'orange';
    static label = 'Concat'
    static ports = [
        {id:"INPUT",spot:new go.Spot(0.1,0.2)},
        {id:"CONCAT",spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.Right},
    ]

    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                    $(go.Picture, { desiredSize: new go.Size(32, 32), source: this.icon, margin: 8 }),
                )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts()
        )
    }
}

export class NodeJoin extends PipelineNode{
    static type = 'join'
    static category = 'MERGE'
    
    static icon = 'assets/images/svg/join.svg';
    static color = 'orange';
    static label = 'Join'
    static ports = [
        {id:"INPUT",spot: new go.Spot(0.1,0.2)},
        {id:"JOIN", spot: new go.Spot(0.1,0.8)},
        {id:"OUTPUT",spot:go.Spot.RightCenter},
    ]
    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                    $(go.Picture, { desiredSize: new go.Size(32, 32), source: this.icon, margin: 8 }),
                )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts()
        )
    }
}

export class NodePycode extends PipelineNode{
    static type = 'pycode';
    static category = 'SCRIPTS';
    
    static icon = 'assets/images/svg/pycode.svg';
    static color = 'orange';
    static label = 'Pycode'
    static ports = [
        {id:"INPUT",spot:go.Spot.Left},
        {id:"OUTPUT",spot:go.Spot.Right},
    ];


    public static getNodeTemplate(options = {}){
        return $(go.Node, 'Spot',
            {...options},
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, "Vertical",
                $(go.Panel, "Auto",
                    $(go.Shape, "Circle", { fill: this.color, stroke: null,  desiredSize: new go.Size(50, 50) }),
                    $(go.Picture, { desiredSize: new go.Size(32, 32), source: this.icon, margin: 8 }),
                )
            ),
            { toolTip: $("ToolTip",$(go.TextBlock, { text: this.label, margin: 4 },new go.Binding("text", "color")))},
            ...this.makePorts()
        )
    }
}