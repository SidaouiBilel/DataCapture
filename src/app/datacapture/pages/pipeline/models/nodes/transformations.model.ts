import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";

import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeTransformations extends PipelineNode{
    static type = 'TRANSFORMATION'
    static category = 'TRANSFORMATION'
    
    static background = 'white';
    static label = 'Generic Transformation'
    static ports = [
        {id:"INPUT", spot:go.Spot.LeftCenter},
        {id:"OUTPUT", spot:go.Spot.RightCenter},
    ]
    static transformer: any = null

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

// TODO IMPLEMENT COMPONENETS FOR EACH TRANSFORMATION
export class NodeTransformationFilter extends NodeTransformations{
    static transformer = Filter
    static icon = "assets/images/svg/filter.svg"
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace;
    static icon = "assets/images/svg/find.svg";
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
    static icon = "assets/images/svg/merge.svg";
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace;
    static icon = "assets/images/svg/replace.svg";
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow;
    static icon = "assets/images/svg/delete.svg";
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue;
    static icon = "assets/images/svg/default.svg";
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter;
    static icon = "assets/images/svg/split.svg";
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator;
    static icon = "assets/images/svg/calc.svg";
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate;
    static icon = "assets/images/svg/date.svg";
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy;
    static icon = "assets/images/svg/group.svg";
}