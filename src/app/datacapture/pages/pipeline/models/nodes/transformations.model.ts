import { Filter, FilterAndReplace, Merge, Replace, DeleteRow, DefaultValue, Splitter, Calculator, FormatDate, GroupBy } from "@app/datacapture/pages/upload/components/transformation/transformations/transformers/transformer.model";
import { BaseNodeTransformationComponent } from "@app/shared/setup/nodes/transformations/base-node-transformation/base-node-transformation.component";

import * as go from "gojs";
import { PipelineNode } from "../node.model";
const $ = go.GraphObject.make;

export class NodeTransformations extends PipelineNode{
    static type = 'TRANSFORMATION'
    static category = 'TRANSFORMATION'
    static template_name = 'TRANSFORMATION'
    static background = 'white';
    static label = 'Generic Transformation'
    static ports = [
        {id:"INPUT", spot:go.Spot.Left},
        {id:"OUTPUT", spot:go.Spot.Right},
    ]
    static transformer: any = null
    static component = BaseNodeTransformationComponent;

    public static getNodeTemplate(options = {}){
        this.createShape();

        return $(go.Node, 'Spot',
            {...options},
            $(go.Panel, "Vertical",
                $(go.Shape, "RoundedTopRectangle", { fill: this.background, stroke: null, height: 4, width: this.width,  }),
                $(go.Panel, "Auto",
                    $(go.Shape, "Rectangle", 
                        {fill: this.color, stroke: null, height: 20 , width: this.width, stretch: go.GraphObject.Horizontal, alignment: go.Spot.LeftCenter}
                    ),
                    $(go.TextBlock,
                        {
                            name: 'TEXT',
                            font: this.fontFamily,
                            stroke: this.background,
                            maxSize: new go.Size(130, NaN),
                            alignment: go.Spot.LeftCenter,
                            margin: 6
                        },
                        new go.Binding("text", "label")
                    ),
                ),
                $(go.Panel, "Auto",
                    $(go.Shape, "RoundedBottomRectangle", { fill: this.background, stroke: null, width: this.width, height: 50 }),
                    $(go.Picture, { desiredSize: new go.Size(35, 35), source: this.icon, alignment: go.Spot.LeftCenter, margin: 6 }),
                    $(go.TextBlock,
                        {
                            name: 'TEXT',
                            margin: 45,
                            font: this.fontFamily,
                            stroke: this.textcolor, maxSize: new go.Size(130, NaN),
                            alignment: go.Spot.LeftCenter
                        },
                        new go.Binding("text", "label")
                    ),
                )
            ),
            // ...this.makePorts()
        )
    }
}

// TODO IMPLEMENT COMPONENETS FOR EACH TRANSFORMATION
export class NodeTransformationFilter extends NodeTransformations{
    static transformer = Filter
    static color = "#13aaff";
    static textcolor = "#13aaff";
    static icon = "assets/images/svg/filter.svg"
}
export class NodeTransformationFilterAndReplace extends NodeTransformations{
    static transformer = FilterAndReplace;
    static color = "#087214";
    static textcolor = "#087214";
    static icon = "assets/images/svg/fr.svg";
}
export class NodeTransformationMerge extends NodeTransformations{
    static transformer = Merge
    static color = "#f5cf87";
    static textcolor = "#475162";
    static icon = "assets/images/svg/merge.svg";
}
export class NodeTransformationReplace extends NodeTransformations{
    static transformer = Replace;
    static color = "#ababec";
    static textcolor = "#ababec";
    static icon = "assets/images/svg/replace.svg";
}
export class NodeTransformationDeleteRow extends NodeTransformations{
    static transformer = DeleteRow;
    static color = "#e76767";
    static textcolor = "#e76767";
    static icon = "assets/images/svg/delete.svg";
}
export class NodeTransformationDefaultValue extends NodeTransformations{
    static transformer = DefaultValue;
    static color = "#abecab";
    static textcolor = "#abecab";
    static icon = "assets/images/svg/default.svg";
}
export class NodeTransformationSplitter extends NodeTransformations{
    static transformer = Splitter;
    static color = "#ecabec";
    static textcolor = "#ecabec";
    static icon = "assets/images/svg/split.svg";
}
export class NodeTransformationCalculator extends NodeTransformations{
    static transformer = Calculator;
    static color = "#4f5d73";
    static textcolor = "#4f5d73";
    static icon = "assets/images/svg/calcul.svg";
}
export class NodeTransformationFormatDate extends NodeTransformations{
    static transformer = FormatDate;
    static color = "#007090";
    static textcolor = "#007090";
    static icon = "assets/images/svg/date.svg";
}
export class NodeTransformationGroupBy extends NodeTransformations{
    static transformer = GroupBy;
    static color = "#f28500";
    static textcolor = "#f28500";
    static icon = "assets/images/svg/group.svg";
}

export const NODE_TRANSFORMERS = [
                NodeTransformationFilter
                ,NodeTransformationFilterAndReplace
                ,NodeTransformationMerge
                ,NodeTransformationReplace
                ,NodeTransformationDeleteRow
                ,NodeTransformationDefaultValue
                ,NodeTransformationSplitter
                ,NodeTransformationCalculator
                ,NodeTransformationFormatDate
                ,NodeTransformationGroupBy
            ].map(cls =>{
                const t = new cls.transformer()
                cls.type = t.type
                cls.label = t.label
                cls.template_name = t.type
                return cls
            })